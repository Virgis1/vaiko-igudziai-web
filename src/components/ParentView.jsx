import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../css/parentDashboard.css";
import ChildDetailsPage from "./ChildDetailsPage";
import Sidebar from "./parent/Sidebar";
import ChildHeader from "./parent/ChildHeader";
import ParentTaskSection from "./parent/ParentTaskSection";
import ParentRewardSection from "./parent/ParentRewardSection";
import PendingSection from "./parent/PendingSection";
import AddTaskModal from "./parent/modals/AddTaskModal";
import AddRewardModal from "./parent/modals/AddRewardModal";
import AddChildModal from "./parent/modals/AddChildModal";
import HelpModal from "./parent/modals/HelpModal";
import {
  approveTaskCompletion,
  rejectTaskCompletion,
} from "../api/parentActions";
import { fulfillRewardPurchase } from "../api/parentActions";
import HistorySection from "./parent/HistorySection";
import { deleteTask, deleteReward } from "../api/parentActions";

function ParentView() {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState('');
  const [parent, setParent] = useState(null);
  const [selectedChildId, setSelectedChildId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(null);
  const [pointsByChild, setPointsByChild] = useState({})
  const [loadingChild, setLoadingChild] = useState(false);
  const [pendingRaw, setPendingRaw] = useState([]);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const [creatingTask, setCreatingTask] = useState(false);
  const [creatingReward, setCreatingReward] = useState(false);

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [creatingChild, setCreatingChild] = useState(false);

  const [pendingTasksRaw, setPendingTasksRaw] = useState([]);
  const [pendingRewardsRaw, setPendingRewardsRaw] = useState([]);

  const selectedChild = children.find((c) => c.id === selectedChildId);

  const [historyItems, setHistoryItems] = useState([]);

  const [showChildCodeModal, setShowChildCodeModal] = useState(false);
  const [codeChild, setCodeChild] = useState(null);

  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("/parents/me");
        setParent(res.data);
        setName(res.data.name);
      } catch (err) {
        console.error("Nepavyko gauti vartotojo", err);
      }
    };
    fetchMe()
  }, []);


  const handleTaskClick = (taskId) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId && t.status === "active"
          ? { ...t, status: "waiting" }
          : t
      )
    );
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("lt-LT", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingTaskItems = pendingTasksRaw
    .filter((p) => p.child_id === selectedChildId)
    .map((p) => {
      const task = tasks.find((t) => t.id === p.task_id);

      return {
        id: p.id,
        completionId: p.id,
        type: "task",
        label: task
          ? `${task.title} (+${task.points} taškai)`
          : `Užduotis #${p.task_id}`,
        time: p.requested_at,
      };
    });

  const pendingRewardItems = pendingRewardsRaw
    .filter((p) => p.child_id === selectedChildId)
    .map((p) => {
      const reward = rewards.find((r) => r.id === p.reward_id);

      return {
        id: `r-${p.id}`,
        purchaseId: p.id,
        type: "reward",
        label: reward
          ? `${reward.title} (-${reward.cost} taškai)`
          : `Prizas #${p.reward_id}`,
        time: formatTime(p.created_at ?? p.purchased_at ?? p.requested_at),
      };
    });

  const handleApproveTask = async (completionId) => {
    try {
      console.log("APPROVE CLICK:", completionId);
      await approveTaskCompletion(completionId);
      await refreshSelectedChild();
    } catch (err) {
      console.error("Approve failed:", err?.response?.data || err);
      alert("Nepavyko patvirtinti užduoties");
    }
  };

  const handleRejectTask = async (completionId) => {
    try {
      console.log("REJECT CLICK:", completionId);
      await rejectTaskCompletion(completionId);
      await refreshSelectedChild();
    } catch (err) {
      console.error("reject failed:", err?.response?.data || err);
      alert("Nepavyko atmesti užduoties");
    }
  };

  const handleFulfillReward = async (purchaseId) => {
    try {
      await fulfillRewardPurchase(purchaseId);
      await refreshSelectedChild();
    } catch (err) {
      console.error("Fulfill reward failed:", err?.response?.data || err);
      alert("Nepavyko pažymėti prizo kaip įvykdyto");
    }
  };

  const pendingItems = [...pendingTaskItems, ...pendingRewardItems].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );


  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.get("/children");
        setChildren(res.data);

        if (res.data.length > 0 && !selectedChildId) {
          setSelectedChildId(res.data[0].id);
        }

        const results = await Promise.all(
          res.data.map(async (child) => {
            try {
              const pointsRes = await api.get(`/children/${child.id}/points`);
              return [child.id, pointsRes.data];
            } catch (err) {
              console.error("Klaida kraunant taškus vaikui", child.id, err);
              return [child.id, null];
            }
          })
        );

        setPointsByChild((prev) => {
          const copy = { ...prev };
          for (const [childId, points] of results) {
            copy[childId] = points;
          }
          return copy;
        });
      } catch (err) {
        console.error("Nepavyko gauti vaikų:", err);
      }
    };

    fetchChildren();
  }, []);

  const refreshSelectedChild = useCallback(async () => {
    if (!selectedChildId) return;

    setLoadingChild(true);
    try {

      const [
        tasksRes,
        rewardsRes,
        pointsRes,
        pendingTasksRes,
        pendingRewardsRes,
        historyRes,
      ] = await Promise.all([
        api.get(`/children/${selectedChildId}/tasks`),
        api.get(`/children/${selectedChildId}/rewards`),
        api.get(`/children/${selectedChildId}/points`),
        api.get(`/parents/me/pending-tasks`),
        api.get(`/parents/me/pending-rewards`),
        api.get(`/children/${selectedChildId}/history`),
      ]);

      setHistoryItems(historyRes.data);
      setTasks(tasksRes.data);
      setRewards(rewardsRes.data);
      setPoints(pointsRes.data);

      setPointsByChild((prev) => ({
        ...prev,
        [selectedChildId]: pointsRes.data,
      }));

      setPendingTasksRaw(pendingTasksRes.data);
      setPendingRewardsRaw(pendingRewardsRes.data);
    } catch (err) {
      console.error("Klaida kraunant vaiko duomenis (ParentView):", err);
    } finally {
      setLoadingChild(false);
    }
  }, [selectedChildId, parent?.id]);

  useEffect(() => {
    if (!selectedChildId) {
      setTasks([]);
      setRewards([]);
      setPoints(null);
      return;
    }

    refreshSelectedChild();
  }, [selectedChildId, refreshSelectedChild]);

  useEffect(() => {
    if (!selectedChildId) return;
    const interval = setInterval(() => {
      refreshSelectedChild();
    }, 15000)
    return () => clearInterval(interval);

  }, [selectedChildId, refreshSelectedChild]);

  const handleCreateTask = async ({ title, points }) => {
    if (!selectedChildId) {
      alert("Pirmiausia pasirink vaiką.");
      return;
    }

    try {
      setCreatingTask(true);

      const res = await api.post("/tasks", {
        title,
        points: Number(points),
        child_id: selectedChildId,
      });

      const createdTask = res.data;
      setTasks((prev) => [...prev, createdTask]);
      setShowTaskModal(false);
    } catch (err) {
      console.error("Klaida kuriant užduotį:", err);
      alert("Nepavyko sukurti užduoties");
    } finally {
      setCreatingTask(false);
    }
  };

  const handleCreateReward = async ({ title, cost }) => {
    if (!selectedChildId) {
      alert("Pirmiausia pasirink vaiką.");
      return;
    }

    try {
      setCreatingReward(true);

      const res = await api.post("/reward", {
        title,
        cost: Number(cost),
        child_id: selectedChildId,
      });

      const createdReward = res.data;
      setRewards((prev) => [...prev, createdReward]);
      setShowRewardModal(false);
    } catch (err) {
      console.error("Klaida kuriant prizą:", err);
      alert("Nepavyko sukurti prizo");
    } finally {
      setCreatingReward(false);
    }
  };

  const handleCreateChild = async ({ name }) => {
    console.log("handle create child start")
    try {
      console.log("name:", name)
      setCreatingChild(true);

      const res = await api.post("/children", {
        name: name.trim()
      });

      console.log("New child:", res.data)

      const newChild = res.data;

      setChildren(prev => [...prev, newChild]);

      setSelectedChildId(newChild.id);

      setShowAddChildModal(false);
    } catch (err) {
      console.error("Nepavyko sukurti vaiko:", err);
      alert("Klaida: nepavyko pridėti vaiko");
    } finally {
      setCreatingChild(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm("Ištrinti užduotį?")) return;
    try {
      await deleteTask(taskId);
      await refreshSelectedChild();
    } catch (e) {
      console.error(e);
      alert("Nepavyko ištrinti užduoties");
    }
  };

  const handleDeleteReward = async (rewardId) => {
    if (!window.confirm("Ištrinti prizą?")) return;
    try {
      await deleteReward(rewardId);
      await refreshSelectedChild();
    } catch (e) {
      console.error(e);
      alert("Nepavyko ištrinti prizo");
    }
  };


  return (
    <div className="container-fluid parent-dashboard">
      <div className="row g-3 h-100">
        <aside className="col-lg-3 col-md-4">
          <Sidebar
            pointsByChild={pointsByChild}
            childrenList={children}
            selectedChildId={selectedChildId}
            onSelectChild={(childId) => {
              const child = children.find((c) => c.id === childId);
              setSelectedChildId(childId);
              setCodeChild(child);
              setShowChildCodeModal(true);
            }}
            onAddChild={() => setShowAddChildModal(true)}
          />
        </aside>
        <main className="col-lg-9 col-md-8">
          <div className="main-card">
            <ChildHeader
              child={selectedChild}
              points={points}
              onAddTask={() => setShowTaskModal(true)}
              onAddReward={() => setShowRewardModal(true)}
              helpModal={() => setShowHelpModal(true)}
            />
            <PendingSection
              items={pendingItems}
              onApprove={handleApproveTask}
              onReject={handleRejectTask}
              onFulfillReward={handleFulfillReward}
            />
            <ParentTaskSection tasks={tasks} onDeleteTask={handleDeleteTask} />
            <ParentRewardSection rewards={rewards} onDeleteReward={handleDeleteReward} />
            <HistorySection items={historyItems.slice(0, 6)} />
          </div>
        </main>
      </div>

      <AddTaskModal
        show={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSave={handleCreateTask}
        loading={creatingTask}
      />
      <AddRewardModal
        show={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        onSave={handleCreateReward}
        loading={creatingReward}
      />
      <AddChildModal
        show={showAddChildModal}
        onClose={() => setShowAddChildModal(false)}
        onSave={handleCreateChild}
        loading={creatingChild}
      />
      <HelpModal
        show={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        loading={creatingChild}
      />
      {showChildCodeModal && codeChild && (
        <div className="modal-backdrop-custom">
          <div className="custom-modal">
            <h4>{codeChild.name}</h4>
            <p>Vaiko prisijungimo kodas:</p>
            <div className="join-code-big">
              {codeChild.join_code}
            </div>
            <button className="btn btn-primary mt-3" onClick={() => setShowChildCodeModal(false)}>
              Uždaryti
            </button>
          </div>
        </div>
      )}

    </div>
  );

}

export default ParentView;

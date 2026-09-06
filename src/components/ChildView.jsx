import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import axios from "axios";
import "../css/ChildView.css";

export default function ChildView() {

  const [child, setChild] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(null);
  const [message, setMessage] = useState("");
  const [pendingTasks, setPendingTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleTaskCompletion = async (childId, taskId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/children/${childId}/tasks/${taskId}/complete`
      );

      setPendingTasks(prev => [...prev, taskId]);

      setMessage("Užduotis išsiųsta tėvams patvirtinti.");
      setTimeout(() => setMessage(""), 3000);

    } catch (error) {
      setMessage("Įvyko klaida, bandykite dar kartą.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [childRes, tasksRes, rewardsRes, pointsRes] = await Promise.all([
          api.get(`/children/1`),
          api.get(`/children/1/tasks`),
          api.get(`/children/1/rewards`),
          api.get(`/children/1/points`),
        ]);

        setChild(childRes.data);
        setTasks(tasksRes.data);
        setRewards(rewardsRes.data);
        setPoints(pointsRes.data);
      } catch (err) {
        console.error("Klaida kraunant vaiko duomenis:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();

    const interval = setInterval(() => {
      fetchAll();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  if (loading) return <p>Kraunama...</p>;

  return (
    <div>
      <header className="header">
        <h2 className="text-center header_title">Taškų rinkimo žaidimas</h2>
        <h4 className="text-end me-5 mt-4">Labas, {child.name}</h4>
      </header>
      <main className="pt-3 ps-5 child-main">
        <div className="container main_info d-flex align-items-center border-bottom border-white pb-2">
          <img
            src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?w=360"
            alt="Avatar"
            className="rounded-circle ms-5"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div className="info-box">
            <span className="info-box__name">{child.name}</span>
            <span className="info-box__balance">{points.balance} taškai</span>
          </div>
        </div>
        <div className="container d-flex flex-column mt-2">
          <h4 className="mt-2 mb-4">Mano užduotys, kurias turiu atlikti</h4>
          <div className="w-50 mt-1">
            {tasks.map((task) => {
              return (
                <div key={task.id} className="d-flex justify-content-around fs-5 border-bottom fw-bold text-white mb-2">
                  <p>{task.title}</p>
                  <p>⭐ x {task.points}</p>
                  {pendingTasks.includes(task.id) ? (
                    <button
                      className="btn btn-secondary btn-sm d-flex align-items-center gap-1"
                      disabled
                    >
                      <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>⏳</span>
                      <span>Laukiama patvirtinimo…</span>
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                      onClick={() => handleTaskCompletion(child.id, task.id)}
                    >
                      <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>✔️</span>
                      <span className="text-white">Atlikta</span>
                    </button>
                  )}
                  {message && (
                    <div className="alert alert-info mt-3 text-center">
                      {message}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
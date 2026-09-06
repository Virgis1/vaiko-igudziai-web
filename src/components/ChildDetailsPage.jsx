import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ChildDetailsPage({childId}) {

  const [child, setChild] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [points, setPoints] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [childRes, tasksRes, rewardsRes, pointsRes] = await Promise.all([
          api.get(`/children/${childId}`),
          api.get(`/children/${childId}/tasks`),
          api.get(`/children/${childId}/rewards`),
          api.get(`/children/${childId}/points`),
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
  }, [childId]);

  if (loading) return <p>Kraunama...</p>;

  return (
    <div className="container mt-4 text-white">
      <h2>{child.name}</h2>

      <p className="mt-3">Surinktų taškų likutis: {points.balance}</p>

      <h5 className="mt-3">Vaikui sukurtos užduotys</h5>
      <button className="btn ms-2 mb-4" style={{ backgroundColor: "#007ab3" }}>pridėti užduotį</button>
      <div className="d-flex flex-row flex-wrap">
        {tasks.map(t => {
          const icon = "📝";
          return (
            <div
              key={t.id}
              className="child-card rounded shadow-sm d-flex flex-column align-items-center justify-content-center m-2 py-5"
              style={{ width: "120px", height: "70px", backgroundColor: "#007ab3", cursor: "pointer" }}
            >
              <span className="child-icon" style={{ fontSize: "1.5rem" }}>{icon}</span>
              <span className="text-black">{t.title}</span>
              <span className="text-black">{t.points} taškai</span>
            </div>
          );
        })}
      </div>

      <h5 className="mt-3">Vaikui sukurti prizai</h5>
      <button className="btn ms-2 mb-4" style={{ backgroundColor: "#006999" }}>pridėti prizą</button>
      <div>
        {rewards.map(r => {
          const icon = "🏆";
        return (
          <div
            key={r.id}
            className="child-card rounded shadow-sm d-flex flex-column align-items-center justify-content-center m-2 py-5"
            style={{ width: "120px", height: "70px", backgroundColor: "#007ab3", cursor: "pointer" }}
          >
            <span className="child-icon" style={{ fontSize: "1.5rem" }}>{icon}</span>
            <span className="text-black">{r.title}</span>
            <span className="text-black">{r.cost} taškai</span>
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default ChildDetailsPage;
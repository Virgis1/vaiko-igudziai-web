import { statusLt } from "../../utils/statusLt";
import { formatLtTime } from "../../utils/time";

const HistorySection = ({ items }) => {
  if (!items?.length) return null;

  return (
    <section className="section-block">
      <h2 className="section-title">Istorija</h2>

      <div className="row g-2">
        {items.map((it) => (
          <div className="col-12 col-md-6 col-lg-4" key={it.id}>
            <div className="history-item">
              <div className="history-left">
                <div className="history-icon">
                  {it.type === "task" ? "✔" : "🏆"}
                </div>

                <div className="history-content">
                  <div className="history-title">
                    {it.title}{" "}
                    <small className="text-muted">
                      ({it.points_delta > 0 ? "+" : ""}
                      {it.points_delta})
                    </small>
                  </div>

                  <div className="history-meta">
                    <span className="badge bg-light text-dark">
                      {statusLt[it.status] ?? it.status}
                    </span>

                    <span className="history-time">
                      {formatLtTime(it.at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistorySection;

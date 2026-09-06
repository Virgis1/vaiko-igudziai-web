import React from "react";
import { formatLtTime } from "../../utils/time";

const PendingSection = ({ items, onApprove, onReject, onFulfillReward }) => {
  if (!items || !items.length) return null;

  return (
    <section className="section-block">
      <h2 className="section-title">Laukia patvirtinimo</h2>

      <div className="row g-2">
        {items.map((item) => (
          <div className="col-12 col-md-6 col-lg-4" key={item.id}>

            <div className="history-item pending-item">
              <div className="history-left">
                <div className="history-icon">
                  {item.type === "task" ? "✔" : "🏆"}
                </div>

                <div className="pending-content">
                  <div className="pending-title">
                    {item.label}
                  </div>

                  <div className="history-time mt-1">
                    {formatLtTime(item.time)}
                  </div>
                </div>
              </div>

              {item.type === "task" && (
                <div className="history-actions mt-3 d-flex gap-2">
                  <button
                    className="btn btn-sm btn-success flex-fill"
                    onClick={() => onApprove(item.completionId)}
                  >
                    Patvirtinti
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger flex-fill"
                    onClick={() => onReject(item.completionId)}
                  >
                    Atmesti
                  </button>
                </div>
              )}

              {item.type === "reward" && (
                <div className="history-actions mt-3">
                  <button
                    className="btn btn-sm btn-primary w-100"
                    onClick={() => onFulfillReward(item.purchaseId)}
                  >
                    Įvykdyta
                  </button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default PendingSection;

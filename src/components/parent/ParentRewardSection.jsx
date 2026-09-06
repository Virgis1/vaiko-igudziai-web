import React from "react";

const RewardSection = ({ rewards, onDeleteReward }) => (
  <section className="section-block">
    <h2 className="section-title">Prizai</h2>
    <div className="row g-3">
      {rewards.map((reward) => (
        <div className="col-md-6" key={reward.id}>
          <div
            type="button"
            className="clickable-card w-100"
          >
            <div className="card-top-row">
              <div className="card-left">
                <div className="icon-circle">🏆</div>
                <p className="task-name mb-0">{reward.title}</p>
              </div>
              <span className="task-points">
                {reward.cost} tašk{reward.cost === 1 ? "as" : "ai"}
              </span>
              <button className="btn btn-sm btn-light border ms-2" title="Ištrinti" onClick={() => onDeleteReward(reward.id)}>
                🗑
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RewardSection;
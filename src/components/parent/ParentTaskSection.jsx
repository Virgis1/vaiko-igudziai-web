import React from "react";

const ParentTaskSection = ({ tasks, onDeleteTask }) => (
  <section className="section-block">
    <div className="d-flex justify-content-between align-items-center mb-1">
      <h2 className="section-title mb-0">Užduotys</h2>
    </div>
    <div className="row g-3">
      {tasks.map((task) => (
        <div className="col-md-4" key={task.id}>
          <div
            type="button"
            className="clickable-card w-100"
          >
            <div className="card-top-row">
              <div className="card-left">
                <div className="icon-circle">✔</div>
                <p className="task-name mb-0">{task.title}</p>
              </div>
              <span className="task-points">
                {task.points} tašk{task.points === 1 ? "as" : "ai"}
              </span>
              <button
                className="btn btn-sm btn-light border ms-2"
                title="Ištrinti"
                onClick={() => onDeleteTask(task.id)}
              >
                🗑
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ParentTaskSection;
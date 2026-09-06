import React from "react";

const ChildHeader = ({ child, points, onAddTask, onAddReward, helpModal }) => {
  if (!child) return null;

  return (
    <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
      <div className="d-flex align-items-center mb-2 mb-md-0">
        <div className="child-header-avatar">🙂</div>
        <div>
          <div className="child-name">{child.name}</div>
          <div className="child-points">{points?.balance ?? 'kraunama'} taškai</div>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-outline-primary btn-action"
          type="button"
          onClick={helpModal}
        >
          Pagalba
        </button>
        <button
          className="btn btn-outline-primary btn-action"
          type="button"
          onClick={onAddTask}
        >
          + Pridėti užduotį
        </button>
        <button
          className="btn btn-primary btn-action"
          type="button"
          onClick={onAddReward}
        >
          + Pridėti prizą
        </button>
      </div>
    </div>
  );
};

export default ChildHeader;

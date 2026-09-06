import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ pointsByChild, childrenList, selectedChildId, onSelectChild, onAddChild }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">

      <button
        className="btn btn-outline-danger mt-3 w-100"
        onClick={handleLogout}
      >
        Atsijungti
      </button>

      <div className="sidebar-title">Vaikai</div>

      {childrenList.map((child) => (
        <button
          key={child.id}
          type="button"
          className={
            "child-item w-100 text-start" +
            (child.id === selectedChildId ? " active" : "")
          }
          onClick={() => onSelectChild(child.id)}
        >
          <div className="child-avatar">{child.avatar}</div>
          <div>
            <div>{child.name}</div>
            <small className="text-muted">{pointsByChild[child.id]?.balance ?? "kraunama"} taškai</small>
          </div>
        </button>
      ))}

      <button className="btn btn-outline-dark btn-add-child" type="button" onClick={onAddChild}>
        + Pridėti vaiką
      </button>
    </div>
  );
};

export default Sidebar;

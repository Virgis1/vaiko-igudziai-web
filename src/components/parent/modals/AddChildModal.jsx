import { useEffect, useState } from "react";
import ModalBase from "./ModalBase";

function AddChildModal({ show, onClose, onSave, loading }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (!show) {
      setName("");
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({ name });
  };

  return (
    <ModalBase title="Pridėti vaiką" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Vaiko vardas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Dovydas"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="modal-footer mt-3 px-0">
          <button
            type="button"
            className="btn btn-outline-secondary me-3"
            onClick={onClose}
            disabled={loading}
          >
            Atšaukti
          </button>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saugoma..." : "Išsaugoti"}
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

export default AddChildModal;

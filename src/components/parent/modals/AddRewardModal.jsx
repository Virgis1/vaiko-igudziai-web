import { useEffect, useState } from "react";
import ModalBase from "./ModalBase";

function AddRewardModal({ show, onClose, onSave, loading }) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState(1);

  useEffect(() => {
    if (!show) {
      setTitle("");
      setCost(1);
    }
  }, [show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, cost });
  };

  return (
    <ModalBase title="Pridėti naują prizą" show={show} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Pavadinimas</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ledai"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kaina taškais</label>
          <input
            type="number"
            className="form-control"
            min={1}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            disabled={loading}
          />
        </div>
        <div className="small text-muted">
          🏆 Ikona bus priskirta automatiškai.
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
          <button type="submit" className="btn btn-primary" disabled={loading || !title.trim()}>
            {loading ? "Saugoma..." : "Išsaugoti"}
          </button>
        </div>
      </form>
    </ModalBase>
  );
}

export default AddRewardModal;
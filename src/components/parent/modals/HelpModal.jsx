import { useEffect, useState } from "react";
import ModalBase from "./ModalBase";
import { HELP_TEXT } from "../../../content/helpText";


function HelpModal({ show, onClose, onSave, loading }) {
  const [title, setTitle] = useState("");
  const [points, setPoints] = useState(1);

  if (!show) return null;

  return (
    <ModalBase title="Pagalba" show={show} onClose={onClose}>
      <pre className="help-text">
        {HELP_TEXT}
      </pre>
      <div className="mt-3 px-3"> <p className="mb-2"> Programėlė vaikams: </p> <a href="https://vaikoigudziai.lt/downloads/vaiko-igudziai.apk" className="btn btn-primary" download > 📱 Atsisiųsti programėlę vaikui (Android) </a> </div>
      <div className="modal-footer mt-3 px-0">
        <button
          type="button"
          className="btn btn-outline-secondary me-3"
          onClick={onClose}
          disabled={loading}
        >
          Uždaryti
        </button>
      </div>
    </ModalBase>
  );
}

export default HelpModal;
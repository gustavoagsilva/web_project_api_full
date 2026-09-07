import Popup from "../Popup/Popup";

function InfoTooltip({ isOpen, isSuccess, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <Popup onClose={onClose}>
      <div className="info-tooltip">
        <div
          className={`info-tooltip__icon ${
            isSuccess
              ? "info-tooltip__icon_success"
              : "info-tooltip__icon_error"
          }`}
        >
          {isSuccess ? "✓" : "✕"}
        </div>

        <p className="info-tooltip__message">
          {isSuccess
            ? "Vitória! Você se registrou."
            : "Ops, algo saiu deu errado! Por favor, tente novamente."}
        </p>
      </div>
    </Popup>
  );
}

export default InfoTooltip;

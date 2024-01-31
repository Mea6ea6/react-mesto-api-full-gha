function ImagePopup(props) {

  const {card, onClose} = props;

  return (
    <div
      className={`popup popup_card ${card ? "popup_opened" : ""}`}
      id="popup-card"
    >
      <figure className="popup__figure">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card?.link}
          alt={card?.name}
        />
        <figcaption className="popup__figcaption">
          {card?.name}
        </figcaption>
      </figure>
    </div>
  );
  
}

export default ImagePopup;

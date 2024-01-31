function PopupWithForm(props) {
  
  const {name, title, children, isOpen, onClose, onSubmit, btnText} = props;

  return (
    <div
      className={`popup popup_${name} ${
        isOpen ? "popup_opened" : ""
      }`}
      id={`${name}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          method="get"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__submit-button"
            aria-label={btnText}
            type="submit"
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );

}

export default PopupWithForm;

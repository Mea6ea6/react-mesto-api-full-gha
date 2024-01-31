import popupIconSuccsess from "../images/popup/__success.svg";
import popupIconError from "../images/popup/__error.svg";

function InfoToolTip(props) {

  const {isOpen, onClose, isSuccess} = props;
    
  return (
    <div className={`popup popup_tooltip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <div className="popup__wrap">
          <img className="popup__image" src={isSuccess ? popupIconSuccsess : popupIconError} alt="¯\(°_o)/¯" />
          <h2 className="popup__title">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
        </div>
      </div>
    </div>
  );

}

export default InfoToolTip;

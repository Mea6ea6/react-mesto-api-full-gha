import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const {isOpen, onClose, onAddPlace} = props;
  const titleRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => { 
    if (isOpen) {
      titleRef.current.value = "";
      linkRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      title: titleRef.current.value,
      link: linkRef.current.value
    });
  }
  
  return (
    <PopupWithForm
        name="add"
        title="Новое место"
        btnText="Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <label className="popup__field">
        <input
            className="popup__input"
            id="named"
            name="name"
            placeholder="Название"
            type="text"
            autoComplete="off"
            minLength="2"
            maxLength="30"
            required
            ref={titleRef}
        />
        <span className="popup__error" id="name-error"></span>
        </label>
        <label className="popup__field">
        <input
            className="popup__input"
            id="link"
            name="link"
            placeholder="Ссылка на картинку"
            type="url"
            required
            ref={linkRef}
        />
        <span className="popup__error" id="link-error"></span>
        </label>
    </PopupWithForm>
  );
  
}

export default AddPlacePopup;

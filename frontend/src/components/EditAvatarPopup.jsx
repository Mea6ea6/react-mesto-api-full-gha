import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const {isOpen, onClose, onUpdateAvatar} = props;
  const avatarRef = useRef(null);

  useEffect(() => { 
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  
  return (
    <PopupWithForm
      name="redact-avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_avatar"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          type="url"
          required
          ref={avatarRef}
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
    </PopupWithForm>
  );
  
}

export default EditAvatarPopup;

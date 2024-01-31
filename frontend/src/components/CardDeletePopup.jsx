import PopupWithForm from "./PopupWithForm";

function CardDeletePopup(props) {

  const {card, isOpen, onClose, onDeleteCard} = props;

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      btnText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
    </PopupWithForm>
  );
  
}

export default CardDeletePopup;

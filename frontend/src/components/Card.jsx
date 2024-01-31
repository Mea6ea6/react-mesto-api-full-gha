import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  
  const {card, onCardClick, onCardLike, onCardDelete} = props;
  const {link, name, likes} = card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner?._id === currentUser?._id;
  const isLiked = card?.likes.some((i) => i?._id === currentUser?._id);

  function handleClick() {
    const data = { link, name };
    onCardClick(data);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && <button className="element__delete" aria-label="Удалить" onClick={handleDeleteClick} />}
      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="element__additionally">
        <h2 className="element__denomination">{name}</h2>
        <div className="element__evaluations">
          <button
            className={`element__like ${
              isLiked ? "element__like_active" : ""
            }`}
            aria-label="Лайк"
            type="button"
            onClick={handleLikeClick}
          />
          <p className="element__counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
  
}

export default Card;

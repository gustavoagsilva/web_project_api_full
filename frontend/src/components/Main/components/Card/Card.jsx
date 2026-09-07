import CurrentUserContext from "../../../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ card, onCardLike, onCardDelete }) {
  const { currentUser, handleOpenImagePopup } = useContext(CurrentUserContext);
  const { name, link, likes, owner } = card;
  const isLiked = likes.includes(currentUser._id);
  const isOwner = owner === currentUser._id;
  const imageComponent = { name, link };
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => handleOpenImagePopup(imageComponent)}
      />
      {isOwner && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={handleCardDelete}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={() => handleLikeClick()}
        />
      </div>
    </li>
  );
}

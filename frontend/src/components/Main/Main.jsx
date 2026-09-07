import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/NewCard/NewCard";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onCardLike,
  onCardDelete,
  handleUpdateAvatar,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const newCardPopup = { title: "Novo local", children: <NewCard /> };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Atualizar foto",
    children: <EditAvatar onUpdateAvatar={handleUpdateAvatar} />,
  };

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Avatar"
          />

          <div className="profile__image-overlay">
            <button
              className="profile__image-edit-button"
              type="button"
              aria-label="Editar foto de perfil"
              onClick={() => onOpenPopup(editAvatarPopup)}
            />
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>

          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          />

          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        />
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup
          ispopupImage={popup.ispopupImage}
          onClose={onClosePopup}
          title={popup.title}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

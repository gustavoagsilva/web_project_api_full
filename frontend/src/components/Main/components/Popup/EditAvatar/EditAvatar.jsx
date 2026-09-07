import { useRef } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const avatarUrlRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarUrlRef.current.value,
    });
  }
  return (
    <form className="popup__form" name="avatar-form" onSubmit={handleSubmit}>
      <input
        type="url"
        className="popup__input"
        id="avatar-url"
        name="avatar-url"
        placeholder="Link da foto"
        required
        ref={avatarUrlRef}
      />

      <button type="submit" className="popup__save-button">
        Salvar
      </button>
    </form>
  );
}

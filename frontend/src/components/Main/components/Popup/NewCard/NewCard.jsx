import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function NewCard() {
  const { handleAddPlaceSubmit } = useContext(CurrentUserContext);

  const [title, setTitle] = useState(""); // Adicione variável de estado para title
  const [link, setLink] = useState(""); // Adicione variável de estado para o link

  const handleTitleChange = (event) => {
    setTitle(event.target.value); // Atualiza o title quando a entrada for alterada
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value); // Atualiza o link quando a entrada for alterada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    handleAddPlaceSubmit({ name: title, link }); // Atualiza as informações do novo cartão
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="2"
          name="card-name"
          placeholder="Title"
          required
          type="text"
          value={title} // Vincular title ao campo de entrada
          onChange={handleTitleChange} // Adicionar manipulador onChange
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Image link"
          required
          type="url"
          value={link} // Vincular link ao campo de entrada
          onChange={handleLinkChange} // Adicionar manipulador onChange
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

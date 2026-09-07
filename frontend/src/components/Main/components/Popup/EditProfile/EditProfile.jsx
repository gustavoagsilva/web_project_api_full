import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtém o objeto de usuário atual
  const [name, setName] = useState(currentUser.name); // Adicione variável de estado para nome
  const [description, setDescription] = useState(currentUser.about); // Adicione variável de estado para descrição

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    handleUpdateUser({ name, about: description }); // Atualiza as informações do usuário
  };

  return (
    <form
      className="popup__form"
      name="profile-form"
      id="edit-profile-form"
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          id="owner-name"
          maxLength="30"
          minLength="2"
          name="userName"
          placeholder="Nome"
          required
          type="text"
          value={name} // Vincular nome ao campo de entrada
          onChange={handleNameChange} // Adicionar manipulador onChange
        />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_description"
          id="owner-description"
          maxLength="30"
          minLength="2"
          name="userDescription"
          placeholder="Sobre mim"
          required
          type="text"
          value={description} // Vincular nome ao campo de entrada
          onChange={handleDescriptionChange} // Adicionar manipulador onChange
        />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}

// export default function EditProfile() {
//   const currentUser = useContext(CurrentUserContext); // Obtém o objeto de usuário atual

//   const [name, setName] = useState(currentUser.name); // Adicione variável de estado para nome
//   const [description, setDescription] = useState(currentUser.about); // Adicione variável de estado para descrição

//   const handleNameChange = (event) => {
//     setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
//   };

//   const handleDescriptionChange = (event) => {
//     setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
//   };
//   return (
//     <form className="popup__form" id="edit-profile-form" noValidate>
//       <input
//         className="popup__input popup__input_type_name"
//         name="name"
//         placeholder="Nome"
//         type="text"
//         required
//         minLength="2"
//         maxLength="40"
//         id="name"
//       />
//       <span className="name-input-error popup__input-error"></span>
//       <input
//         className="popup__input popup__input_type_description"
//         name="description"
//         placeholder="Sobre mim"
//         type="text"
//         required
//         minLength="2"
//         maxLength="200"
//         id="description"
//       />
//       <span className="description-input-error popup__input-error"></span>
//       <button className="button popup__button" type="submit">
//         Salvar
//       </button>
//     </form>
//   );
// }

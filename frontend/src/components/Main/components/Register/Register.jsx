import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister(email, password);
  };

  return (
    <div className="register">
      <main className="register__content">
        <h1 className="register__title">Inscrever-se</h1>

        <form className="form__register" noValidate onSubmit={handleSubmit}>
          <input
            className="form__input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            className="form__input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={handlePasswordChange}
          />

          <button className="form__button" type="submit">
            Inscrever-se
          </button>
        </form>

        <Link className="register__signup-link" to="/login">
          Já é membro? Faça o login aqui
        </Link>
      </main>
    </div>
  );
}

export default Register;

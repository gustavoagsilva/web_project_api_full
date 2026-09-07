import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {
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
    handleLogin(email, password);
  };

  return (
    <div className="login">
      <main className="login__content">
        <h1 className="login__title">Entrar</h1>

        <form className="form__login" noValidate onSubmit={handleSubmit}>
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
            Entrar
          </button>
        </form>

        <Link className="login__signup-link" to="/register">
          Ainda não é membro? Inscreva-se aqui
        </Link>
      </main>
    </div>
  );
}

export default Login;

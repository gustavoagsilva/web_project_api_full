import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { useCallback, useEffect, useRef, useState } from "react";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ImagePopup from "./Main/components/Popup/ImagePopup/ImagePopup";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./Main/components/Register/Register.jsx";
import Login from "./Main/components/Login/Login.jsx";
import InfoTooltip from "./Main/components/InfoTooltip/InfoTooltip.jsx";
import { handleSetToken, handleGetToken, handleDeletToken } from "../utils/token.js";
import ProtectedRoute from "./Main/components/ProtectedRoute.jsx";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(handleGetToken);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(() => Boolean(handleGetToken()));
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const sessionVersion = useRef(0);

  const onSignOut = useCallback(() => {
    sessionVersion.current += 1;
    handleDeletToken();
    setToken(null);
    setIsLoggedIn(false);
    setIsLoading(false);
    setCurrentUser({});
    setCards([]);
    setPopup(null);
    setIsInfoTooltipOpen(false);
    setErrorMessage("");
    navigate("/login", { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (!token) return;
    let active = true;
    const version = sessionVersion.current;
    const isCurrent = () => active && version === sessionVersion.current;

    auth.JWTVerification(token)
      .then((user) => {
        if (!isCurrent()) return;
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if (!isCurrent()) return;
        if ([401, 403, 404].includes(error.status)) onSignOut();
        setErrorMessage(error.message);
      })
      .finally(() => {
        if (isCurrent()) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token, onSignOut]);

  useEffect(() => {
    if (!isLoggedIn || !token) return;
    let active = true;
    const version = sessionVersion.current;

    api.getInitialCards(token)
      .then((data) => {
        if (active && version === sessionVersion.current) setCards(data);
      })
      .catch((error) => {
        if (!active || version !== sessionVersion.current) return;
        if (error.status === 401) onSignOut();
        setErrorMessage(error.message);
      });

    return () => {
      active = false;
    };
  }, [isLoggedIn, token, onSignOut]);

  function runAuthenticated(action, onSuccess) {
    if (!token || !isLoggedIn) return;
    const version = sessionVersion.current;
    setErrorMessage("");
    return action(token)
      .then((data) => {
        if (version === sessionVersion.current) onSuccess(data);
      })
      .catch((error) => {
        if (version !== sessionVersion.current) return;
        if (error.status === 401) onSignOut();
        setErrorMessage(error.message);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);
    return runAuthenticated(
      (sessionToken) => isLiked
        ? api.removeLike(card._id, sessionToken)
        : api.addLike(card._id, sessionToken),
      (newCard) => setCards((state) => state.map((item) => (
        item._id === card._id ? newCard : item
      ))),
    );
  }

  function handleCardDelete(card) {
    return runAuthenticated(
      (sessionToken) => api.removeCard(card._id, sessionToken),
      () => setCards((state) => state.filter((item) => item._id !== card._id)),
    );
  }

  function handleUpdateUser(data) {
    return runAuthenticated(
      (sessionToken) => api.setUserInfo(data, sessionToken),
      (user) => {
        setCurrentUser(user);
        setPopup(null);
      },
    );
  }

  function handleUpdateAvatar(data) {
    return runAuthenticated(
      (sessionToken) => api.setUserAvatar(data, sessionToken),
      (user) => {
        setCurrentUser(user);
        setPopup(null);
      },
    );
  }

  function handleAddPlaceSubmit(card) {
    return runAuthenticated(
      (sessionToken) => api.addCard(card, sessionToken),
      (newCard) => {
        setCards((state) => [newCard, ...state]);
        setPopup(null);
      },
    );
  }

  function handleOpenPopup(content) {
    setPopup(content);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleOpenImagePopup(card) {
    handleOpenPopup({ children: <ImagePopup card={card} />, ispopupImage: true });
  }

  function handleRegister(email, password) {
    setErrorMessage("");
    auth.Register({ email, password })
      .then(() => {
        navigate("/login");
        setIsRegistrationSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch(() => {
        setIsRegistrationSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    const version = ++sessionVersion.current;
    handleDeletToken();
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser({});
    setCards([]);
    setErrorMessage("");
    setIsLoading(true);
    auth.Login({ email, password })
      .then((response) => {
        if (version !== sessionVersion.current) return;
        handleSetToken(response.token);
        setCurrentUser({});
        setCards([]);
        setIsLoggedIn(false);
        setToken(response.token);
        navigate("/");
      })
      .catch((error) => {
        if (version !== sessionVersion.current) return;
        setIsLoading(false);
        setErrorMessage(error.message);
      });
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleOpenImagePopup,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page__content">
        <Header
          onSignOut={onSignOut}
          isLoggedIn={isLoggedIn}
          userEmail={currentUser.email || ""}
        />
        {errorMessage && (
          <p className="page__section" role="alert">{errorMessage}</p>
        )}
        <Routes>
          <Route
            path="/register"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} isLoading={isLoading}>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  handleUpdateAvatar={handleUpdateAvatar}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isSuccess={isRegistrationSuccess}
          onClose={() => setIsInfoTooltipOpen(false)}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

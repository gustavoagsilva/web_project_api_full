function handleSetToken(token) {
  return localStorage.setItem("token", token);
}

function handleGetToken() {
  return localStorage.getItem("token");
}

function handleDeletToken() {
  return localStorage.removeItem("token");
}

export { handleGetToken, handleSetToken, handleDeletToken };

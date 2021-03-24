import axios from "axios";

export const register = () => {
  axios
    .post("/register", {
      secret: "5b956e10a2161664c27e53becddb00ab10430b6a",
    })
    .then(({ data }) => {
      const { username, password } = data;
      localStorage.setItem("api-username", username);
      localStorage.setItem("api-password", password);
    });
};

export const apiTokenAuth = () => {
  const userData = {
    username: localStorage.getItem("api-username"),
    password: localStorage.getItem("api-password"),
  };
  axios.post("/api-token-auth", userData).then(({ data }) => {
    localStorage.setItem("api-token", data.token);
  });
};

export const createSession = () => {};

export const viewSession = () => {};

export const messages = () => {};

export const sendMessages = () => {};

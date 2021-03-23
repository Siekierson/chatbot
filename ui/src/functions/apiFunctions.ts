import axios from "axios";

export const register = () => {
  axios
    .post("/register", {
      secret: "5b956e10a2161664c27e53becddb00ab10430b6a",
    })
    .then((res) => {
      //res.data;
    });
};

export const apiTokenAuth = () => {};

export const createSession = () => {};

export const viewSession = () => {};

export const messages = () => {};

export const sendMessages = () => {};

import axios from "axios";
interface TokenAuth {
  username: string;
  password: string;
}

const authAxios = axios.create({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("api-token"),
  },
});
export const register = () => {
  return axios
    .post("/register", {
      secret: "5b956e10a2161664c27e53becddb00ab10430b6a",
    })
    .then(({ data }) => {
      const { username, password } = data;
      localStorage.setItem("api-username", username);
      localStorage.setItem("api-password", password);
      return { username, password };
    });
};

export const apiTokenAuth = (props: TokenAuth) => {
  return axios.post("/api-token-auth", props).then(({ data }) => {
    localStorage.setItem("api-token", data.token);
    return data.token;
  });
};

export const createSession = (token: string) => {
  return authAxios
    .post("/create-session", null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(({ data }) => {
      localStorage.setItem("api-id", data.id);
      return data.id;
    });
};

export const messages = (setConversation: Function) => {
  authAxios
    .get(`/messages/?id=${localStorage.getItem("api-id")}`)
    .then(({ data }) => setConversation(data ? data : []));
};

export const sendMessage = (id: string | null, message: string) => {
  return authAxios
    .post("/send-message", { id, message })
    .then(({ data }) => data);
};

import {
  apiTokenAuth,
  register,
  createSession,
  sendMessage,
} from "./apiFunctions";
const firstTime = async (updateState: Function) => {
  await register()
    .then((data) => apiTokenAuth(data))
    .then((token) => createSession(token))
    .then((id) => sendMessage(id, ""))
    .then((res) => updateState([{ isCobe: true, content: res.message }]))
    .catch((err) => console.log(err));
};
export default firstTime;

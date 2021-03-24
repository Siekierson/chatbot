import { apiTokenAuth, register } from "./apiFunctions";
const firstTime = async () => {
  await register();
  await apiTokenAuth();
};
export default firstTime;

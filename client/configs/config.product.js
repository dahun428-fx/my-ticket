import getConfigs from "./config.common";

const baseUrl = "https://my-ticket-git-dev-1-dahun428-fxs-projects.vercel.app";
const mode = "local";
const apiUrl = "http://localhost:4001";

export default getConfigs({
  baseUrl,
  mode,
  apiUrl,
});

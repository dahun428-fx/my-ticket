import getConfigs from "./config.common";

const baseUrl = 'http://localhost:3000';
const mode = 'local';
const apiUrl = 'http://localhost:4001';

export default getConfigs({
    baseUrl, mode, apiUrl
})  
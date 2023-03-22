export default function getConfigs(params) {
    const { baseUrl, mode, apiUrl } = params;
    return {
        baseUrl, mode, apiUrl
    }
}
const ServerURL = () => {
    let SERVER_BASE_URL = 'http://localhost:4001';
    switch (process.env.NEXT_PUBLIC_RUN_MODE) {
    case 'local': 
        SERVER_BASE_URL = 'http://localhost:4001';
        break;
    case 'dev': 
        SERVER_BASE_URL = 'http://localhost:4001';
        break;
    case 'prd': 
        SERVER_BASE_URL = 'http://localhost:4001';
        break;
    default: 
        SERVER_BASE_URL = 'http://localhost:4001';
        break;
    }
    return SERVER_BASE_URL;
}
module.exports = {
    ServerURL
}
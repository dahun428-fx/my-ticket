
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `/api/user/login`,
        destination:`${SERVER_BASE_URL}/api/v1/auth/authenticate`,
      },
      {
        source: `/api/auth/refresh`,
        destination:`${SERVER_BASE_URL}/api/v1/auth/refresh`
      },
      {
        source: `/api/user/getUser`,
        destination: `${SERVER_BASE_URL}/api/v1/user/getUser`
      }
    ]
  }
}

module.exports = nextConfig

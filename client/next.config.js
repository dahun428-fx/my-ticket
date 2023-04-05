
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
      },
      {
        source :`/api/user/oauth`,
        destination: `${SERVER_BASE_URL}/api/v1/auth/oauth`
      },
      {
        source : `/api/user/signup`,
        destination: `${SERVER_BASE_URL}/api/v1/user/signup`
      },
      {
        source:'/api/auth/add/provider',
        destination : `${SERVER_BASE_URL}/api/v1/auth/add/provider`
      },
      {
        source:'/api/user/signout',
        destination : `${SERVER_BASE_URL}/api/v1/auth/signout`
      },
      {
        source:'/api/user/providerinfo',
        destination : `${SERVER_BASE_URL}/api/v1/user/getProviderInfo`
      },
      {
        source:`/github/login/oauth/accessToken/:code`,
        destination: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_PW}&code=:code`
      },
      {
        source:`/fb/login/oauth/accessToken/:code/:redirecturl*`,
        destination : `https://graph.facebook.com/v16.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_PW}&code=:code&redirect_uri=${process.env.NEXTAUTH_URL}/:redirecturl*`
        // destination : `https://graph.facebook.com/v16.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_PW}&code=:code&redirect_uri=http://localhost:3000/user/connectProvider`
      }
    ]
  }
}

module.exports = nextConfig

const {ServerURL} = require('../config.export.module');

let SERVER_BASE_URL = ServerURL();
const UserRewrites = [
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
        source: '/api/user/me',
        destination : `${SERVER_BASE_URL}/api/v1/user/findUserInfo`
      },
]
module.exports = {
    UserRewrites,
}
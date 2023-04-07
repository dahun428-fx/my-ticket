

const ProviderRewrites = [
    {
        source:`/github/login/oauth/accessToken/:code`,
        destination: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_PW}&code=:code`
      },
      {
        source:`/fb/login/oauth/accessToken/:code/:redirecturl*`,
        destination : `https://graph.facebook.com/v16.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_PW}&code=:code&redirect_uri=${process.env.NEXTAUTH_URL}/:redirecturl*`
        // destination : `https://graph.facebook.com/v16.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_PW}&code=:code&redirect_uri=http://localhost:3000/user/connectProvider`
      },
      {
        source:`/kakao/login/oauth/accessToken`,
        destination:`https://kauth.kakao.com/oauth/token`
      },
      {
        source:`/kakao/v2/user/me`,
        destination: `https://kauth.kakao.com/v2/user/me`
      },
      {
        source:`/naver/login/oauth/accessToken/:code/:redirecturl*`,
        destination:`https://nid.naver.com/oauth2.0/token?client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_PW}&grant_type=authorization_code&state=123456&code=:code&redirect_uri=${process.env.NEXTAUTH_URL}/:redirecturl*`,
      },
      {
        source:`/naver/v2/user/me`,
        destination : `https://openapi.naver.com/v1/nid/me`
      }
]

module.exports = {
    ProviderRewrites,
}
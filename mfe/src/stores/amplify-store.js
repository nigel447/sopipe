import { Amplify } from 'aws-amplify'
const fedAuth = {
    domain: "nigelsavage.auth.eu-west-1.amazoncognito.com",
    scope: ["email", "profile", "openid"],
    redirectSignIn: "http://localhost:3000/socialSignIn",
    redirectSignOut: "http://localhost:3000",
    responseType: "token"
  }

  const auth = {
    mandatorySignIn: true,
    region: 'eu-west-1',
    userPoolId: "eu-west-1_9vfpdtgRr",
    userPoolWebClientId: "7ka889jkncipm2kbm7o8iall26",
    domain: "nigelsavage.auth.eu-west-1.amazoncognito.com",
    scope: ["email", "profile", "openid"],
    redirectSignIn: "http://localhost:3000/socialSignIn",
    redirectSignOut: "http://localhost:3000",
    responseType: "token"
  }

  export const ConfigureAmplifyStore = () => {
    Amplify.configure({
        Auth:auth,
        oauth: fedAuth,
    })
    return true
}
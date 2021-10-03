import { Amplify } from 'aws-amplify'

const isLocal = false

const fedAuth = {
  domain: "nigelsavage.auth.eu-west-1.amazoncognito.com",
  scope: ["email", "profile", "openid"],
  redirectSignIn: "http://localhost:3000/socialSignIn",
  redirectSignOut: "http://localhost:3000",
  responseType: "token"
}

const fedAuthDeployed = {
  domain: "nigelsavage.auth.eu-west-1.amazoncognito.com",
  scope: ["email", "profile", "openid"],
  redirectSignIn: "https://edu.nigelsavage.com/socialSignIn",
  redirectSignOut: "https://edu.nigelsavage.com",
  responseType: "token"
}

const auth = {
  mandatorySignIn: true,
  region: 'eu-west-1',
  userPoolId: "XXXX",
  userPoolWebClientId: "YYYY",
  domain: "nigelsavage.auth.eu-west-1.amazoncognito.com",
  scope: ["email", "profile", "openid"],
  redirectSignIn: "http://localhost:3000/socialSignIn",
  redirectSignOut: "http://localhost:3000",
  responseType: "token"
}

const authDeployed = {
  mandatorySignIn: true,
  region: 'eu-west-1',
  userPoolId: "XXXX",
  userPoolWebClientId: "YYYY",
  domain: "nigelsavage.auth.eu-west-1.amazoncognito.com",
  scope: ["email", "profile", "openid"],
  redirectSignIn: "https://edu.nigelsavage.com/socialSignIn",
  redirectSignOut: "https://edu.nigelsavage.com",
  responseType: "token"
}

export const ConfigureAmplifyStore = () => {
  if (isLocal) {
    Amplify.configure({
      Auth: auth,
      oauth: fedAuth,
    })
  } else {
    Amplify.configure({
      Auth: authDeployed,
      oauth: fedAuthDeployed,
    })
  }

  return true
}
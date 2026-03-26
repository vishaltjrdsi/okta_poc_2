import { OktaAuth } from '@okta/okta-auth-js';

export const oktaConfig = {
  issuer: process.env.REACT_APP_OKTA_ISSUER,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: process.env.REACT_APP_OKTA_REDIRECT_URI,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

export const oktaAuth = new OktaAuth(oktaConfig);
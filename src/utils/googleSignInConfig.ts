
// src/utils/googleSignInConfig.ts
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      '68753555206-9abvln0g5a4bmqjf4ed2s3eb1nb07lro.apps.googleusercontent.com', // From Google Console
    offlineAccess: true,
    hostedDomain: '',
    // loginHint: '',
    forceCodeForRefreshToken: true,
  });
};

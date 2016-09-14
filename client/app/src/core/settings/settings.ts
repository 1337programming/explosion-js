// Webpack Build Variables
// webpack inserts variables into global properties
import * as Firebase from 'firebase';

declare const WEBPACK_API_ENDPOINT:string;
declare const WEBPACK_ENV:string;
declare const WEBPACK_PROD:boolean;

export let Settings = {
  API_ENDPOINT: `${WEBPACK_API_ENDPOINT}/ws`,
  ENV: WEBPACK_ENV,
  PROD: WEBPACK_PROD
};

let config = {
  apiKey: "AIzaSyApYZp0CSA7EiW4JN0LiN8qy7Vng8vILlI",
  authDomain: "taworkshop-32e79.firebaseapp.com",
  databaseURL: "https://taworkshop-32e79.firebaseio.com",
  storageBucket: "taworkshop-32e79.appspot.com"
};
Firebase.initializeApp(config);

export const FIREBASE = Firebase;

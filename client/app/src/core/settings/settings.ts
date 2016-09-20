import * as Firebase from 'firebase';

// Webpack Build Variables
// webpack inserts variables into global properties
declare const WEBPACK_API_ENDPOINT:string;
declare const WEBPACK_ENV:string;
declare const WEBPACK_PROD:boolean;

export const Settings = {
  API_ENDPOINT: `${WEBPACK_API_ENDPOINT}`,
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

let database = Firebase.database();
console.log('database', database);

export const FIREBASE = Firebase;

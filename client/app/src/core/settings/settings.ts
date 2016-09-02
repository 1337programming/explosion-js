// Webpack Build Variables
// webpack inserts variables into global properties

declare const WEBPACK_API_ENDPOINT:string;
declare const WEBPACK_ENV:string;
declare const WEBPACK_PROD:boolean;

export let Settings = {
  API_ENDPOINT: WEBPACK_API_ENDPOINT,
  ENV: WEBPACK_ENV,
  PROD: WEBPACK_PROD
};
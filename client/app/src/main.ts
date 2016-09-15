import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

declare let WEBPACK_PROD: string;
declare let module: any;

if (WEBPACK_PROD) {
  enableProdMode();
} else {
  if (module.hot) {
    module.hot.accept();
  }
}


platformBrowserDynamic().bootstrapModule(AppModule);

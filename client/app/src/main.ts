import {platformBrowser} from '@angular/platform-browser';


declare let module: any;
if (module.hot) {
  module.hot.accept();
}

//platformBrowser().bootstrapModuleFactory(MainModule)

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

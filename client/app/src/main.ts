import {platformBrowser} from '@angular/platform-browser';

import { MainModule } from './modules/main/main.module';

declare let module:any;
if (module.hot) {
  module.hot.accept();
}

//platformBrowser().bootstrapModuleFactory(MainModule)

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(MainModule);
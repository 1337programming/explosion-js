import {platformBrowser} from '@angular/platform-browser';

import { ExplosionModule } from './modules/explosion/explosion.module';

declare let module:any;
if (module.hot) {
  module.hot.accept();
}

//platformBrowser().bootstrapModuleFactory(MainModule)

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(ExplosionModule);

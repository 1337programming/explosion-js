import {Routes, RouterModule}   from '@angular/router';

import {HomeComponent} from 'app/src/modules/main/components/main/components/home/home.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

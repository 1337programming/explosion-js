import {Routes, RouterModule}   from '@angular/router';

import {HomeComponent} from 'app/src/modules/explosion/components/explosion/components/home/home.component';
import {DashboardComponent} from 'app/src/modules/explosion/components/explosion/components/dashboard/dashboard.component';
import {FireworkTest} from '../components/explosion/components/fireworks-test/fireworks-test.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'fireworks-test',
    component: FireworkTest
  }
];

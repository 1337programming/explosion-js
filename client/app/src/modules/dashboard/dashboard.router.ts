import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {DashboardComponent} from './dashboard.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent}
];

/**
 * Routing Providers for the App
 * @type {Array}
 */
export const appRoutingProviders: any[] = [];

/**
 * Routes for the App
 * @type {ModuleWithProviders}
 */
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

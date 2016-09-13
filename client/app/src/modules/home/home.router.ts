import {Routes, RouterModule}   from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
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

import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

// Components
import {FooterComponent} from 'app/src/common/components/footer/footer.component';
import {NavbarComponent} from 'app/src/common/components/navbar/navbar.component';
import {HomeComponent} from 'app/src/modules/explosion/components/explosion/components/home/home.component';
import {DashboardComponent} from 'app/src/modules/explosion/components/explosion/components/dashboard/dashboard.component';
import {ExplosionComponent} from 'app/src/modules/explosion/components/explosion/explosion.component';
import {LoadingIndicator} from "app/src/common/components/loading-indicator/loading-indicator.component";
import {Chime} from "./components/explosion/components/dashboard/components/chime/chime.component";

// Directives
import {ForAnyOrder} from 'app/src/common/directives/for-any-order.directive';

import {ROUTES} from './router/explosion-router';

// Custom Components

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  declarations: [ExplosionComponent, FooterComponent, NavbarComponent, HomeComponent, DashboardComponent, Chime, LoadingIndicator, ForAnyOrder],
  bootstrap: [ExplosionComponent]
})
export class ExplosionModule {
}
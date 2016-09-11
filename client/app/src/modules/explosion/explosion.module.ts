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
import {Fireworks} from './components/explosion/components/home/components/fireworks.component';
import {FireworkTest} from './components/explosion/components/fireworks-test/fireworks-test.component';

// Directives
import {ForAnyOrder} from 'app/src/common/directives/for-any-order.directive';

// Routes
import {ROUTES} from './router/explosion.router';

// Services
import {Audio} from 'app/src/common/services/audio.service';
import {Samples} from 'app/src/common/services/samples.service';

// Custom Components

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  declarations: [ExplosionComponent, FooterComponent, NavbarComponent, HomeComponent,
    DashboardComponent, Chime, LoadingIndicator, ForAnyOrder, Fireworks, FireworkTest],
  providers: [Audio, Samples],
  bootstrap: [ExplosionComponent]
})
export class ExplosionModule {
}
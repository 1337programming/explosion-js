import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

// Modules
import {HomeModule} from './modules/home/home.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';

// Components
import {FooterComponent} from 'app/src/common/components/footer/footer.component';
import {NavbarComponent} from 'app/src/common/components/navbar/navbar.component';
import {LoadingIndicator} from "app/src/common/components/loading-indicator/loading-indicator.component";
import {AppComponent} from './app.component';

// Routes
import {routing} from './app.router';

// Services
import {Random} from './common/services/random.service';
import {Samples} from './common/services/samples.service';
import {Audio} from './common/services/audio.service';

// Custom Components

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule,
    routing, HomeModule, DashboardModule
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent, LoadingIndicator],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    Random,
    Samples,
    Audio,
    {provide: 'audioContext', useValue: new (window['AudioContext'] || window['webkitAudioContext']) },
    {provide: 'size', useValue: {width: 1280, height: 780}},
    {provide: 'notes', useValue: ['C4', 'G4', 'C5', 'D5', 'E5']}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

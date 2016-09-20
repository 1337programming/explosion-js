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


// AudioContext Mock
interface AudioMockContextI {
  createDynamicsCompressor: Function;
  destination: string;
  createBufferSource: Function;
  createStereoPanner: Function;
  createScriptProcessor: Function;
  createGain: Function;
}
// Custom Components
let AudioContextMock: AudioMockContextI = {
  createDynamicsCompressor: function () {
    return null;
  },
  destination: null,
  createBufferSource: function () {
    return null;
  },
  createStereoPanner: function () {
    return null;
  },
  createScriptProcessor: function () {
    return null;
  },
  createGain: function () {
    return null;
  },
};
let AudioContext: AudioMockContextI = AudioContextMock;
if (window['AudioContext']) {
  AudioContext = window['AudioContext'];
} else if (window['webkitAudioContext']) {
  AudioContext = window['webkitAudioContext'];
}

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
    {provide: 'audioContext', useValue: AudioContext},
    {provide: 'size', useValue: {width: 1280, height: 780}},
    {provide: 'notes', useValue: ['C4', 'G4', 'C5', 'D5', 'E5']}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

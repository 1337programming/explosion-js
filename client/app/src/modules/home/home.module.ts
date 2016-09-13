import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

// Components
import {HomeComponent} from './home.component';
import {Fireworks} from './components/fireworks/fireworks.component';
import {FireworkTest} from './components/fireworks-test/fireworks-test.component';

// Routes
import {routing} from './home.router';

// Services
import {Audio} from 'app/src/common/services/audio.service';
import {Samples} from 'app/src/common/services/samples.service';
import {HomeService} from './services/home.service';
// Custom Components

@NgModule({
  imports: [
    CommonModule, HttpModule, ReactiveFormsModule, FormsModule, routing
  ],
  declarations: [HomeComponent, Fireworks, FireworkTest],
  providers: [Audio, Samples, HomeService]
})
export class HomeModule {
}

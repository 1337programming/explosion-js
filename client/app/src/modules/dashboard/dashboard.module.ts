import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

// Components
import {DashboardComponent} from './dashboard.component';
import {Chime} from './components/chime/chime.component';

// Directives
import {ForAnyOrder} from 'app/src/common/directives/for-any-order.directive';

// Routes
import {routing} from './dashboard.router';

// Services
import {Audio} from 'app/src/common/services/audio.service';
import {Samples} from 'app/src/common/services/samples.service';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpModule, routing
  ],
  declarations: [DashboardComponent, Chime, ForAnyOrder],
  providers: [Audio, Samples]
})
export class DashboardModule {
}

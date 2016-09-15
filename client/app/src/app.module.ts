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

// Custom Components

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule,
    routing, HomeModule, DashboardModule
  ],
  declarations: [AppComponent, FooterComponent, NavbarComponent, LoadingIndicator],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

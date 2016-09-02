import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {FooterComponent} from 'app/src/common/components/footer/footer.component';
import {NavbarComponent} from 'app/src/common/components/navbar/navbar.component';
import {HomeComponent} from 'app/src/modules/main/components/main/components/home/home.component';

import {ROUTES} from 'app/src/core/router/main-router';
import {MainComponent} from 'app/src/modules/main/components/main/main.component';

// Custom Components

@NgModule({
  imports: [
    BrowserModule, ReactiveFormsModule, FormsModule, HttpModule, RouterModule.forRoot(ROUTES, {useHash: true})
  ],
  declarations: [MainComponent, FooterComponent, NavbarComponent, HomeComponent],
  bootstrap: [MainComponent]
})
export class MainModule {
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule,
  NzFormModule,
  NzIconModule,
  NzInputModule, NzMenuModule,
  NzSliderModule,
  NzTypographyModule
} from 'ng-zorro-antd';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {LoginformComponent} from './loginform/loginform.component';
import {HttpbaseurlInterceptor} from './_interceptors/httpbaseurl.interceptor';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { TopmenuComponent } from './topmenu/topmenu.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    LoginformComponent,
    DashboardpageComponent,
    TopmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NzSliderModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    NzCardModule,
    NzTypographyModule,
    NzAlertModule,
    NzMenuModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HttpbaseurlInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

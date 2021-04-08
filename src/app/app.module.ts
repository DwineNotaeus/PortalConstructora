import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './modules/authentication/login/login.component';
import { Interceptor } from './core/interceptors/interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConsultasIQGuard } from './core/guards/consultas-iq.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsalModule } from '@azure/msal-angular';
import { DataTablesModule } from 'angular-datatables';
import { SearchByProjectsComponent } from './modules/search-by-projects/search-by-projects.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SearchByDocumentComponent } from './modules/search-by-document/search-by-document.component';
import { BulkLoadComponent } from './modules/bulk-load/bulk-load.component';
import { RecaptchaModule, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from './modules/authentication/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchByProjectsComponent,
    SearchByDocumentComponent,
    BulkLoadComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    RecaptchaModule,
    MsalModule.forRoot({
      auth: {
        clientId: "cb0ddcd3-1cd3-4cf2-b4bf-334b61621b67",
        authority: "https://pruebacontosob2c.b2clogin.com/pruebacontosob2c.onmicrosoft.com/B2C_1_login",
        validateAuthority: false,
        redirectUri: "http://localhost:4200/" // desarrollo
      },
      cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false
      }
    }, {
      consentScopes: [
        "user.read", "openid", "profile"
      ]
    })
  ],
  providers: [
    ConsultasIQGuard,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.keyCaptcha }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from "./angular-material.module";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientInterfaceComponent } from './components/client-interface/client-interface.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';
import { RequestsComponent } from './components/requests/requests.component';
import { ApiServicatService } from './services/api-servicat.service';
import { HomeComponent } from './components/home/home.component';
import { CookiesComponent } from './components/cookies/cookies.component';
import { CookieService } from 'ngx-cookie-service';
import { RequestUpdateComponent } from './components/request-update/request-update.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ClientInterfaceComponent,
    UserInterfaceComponent,
    RequestsComponent,
    HomeComponent,
    CookiesComponent,
    RequestUpdateComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    RequestsComponent,
    UserInterfaceComponent,
    ConfirmDialogComponent,
    RequestUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [ApiServicatService, CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

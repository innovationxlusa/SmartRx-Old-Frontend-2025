import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import {WebcamModule} from 'ngx-webcam';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import {NgxImageCompressService} from 'ngx-image-compress';
import { DataTablesModule } from "angular-datatables";

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { UploadPrescriptionComponent } from './upload-prescription/upload-prescription.component';
import { ShowPrescriptionComponent } from './upload-prescription/show-prescription/show-prescription.component';
import { AddEditPrescriptionComponent } from './upload-prescription/add-edit-prescription/add-edit-prescription.component';

import {SharedService} from './shared.service';
import{HttpClientModule} from '@angular/common/http';
import{ReactiveFormsModule} from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { UploadRegPrescriptionComponent } from './upload-reg-prescription/upload-reg-prescription.component';
import { AddEditRegPrescriptionComponent } from './upload-reg-prescription/add-edit-reg-prescription/add-edit-reg-prescription.component';
import { ShowRegPrescriptionComponent } from './upload-reg-prescription/show-reg-prescription/show-reg-prescription.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SmartrxComponent } from './smartrx/smartrx.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgSelectModule } from '@ng-select/ng-select';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { HighchartsChartComponent } from 'highcharts-angular';
import { ChartComponent } from './chart/chart.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    UploadPrescriptionComponent,
    ShowPrescriptionComponent,
    AddEditPrescriptionComponent,
    AlertComponent,
    UploadRegPrescriptionComponent,
    AddEditRegPrescriptionComponent,
    ShowRegPrescriptionComponent,
    SmartrxComponent,
    JwPaginationComponent,
    HighchartsChartComponent,
    ChartComponent    
  ],
  imports: [
    NgSelectModule,
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    ReactiveFormsModule, 
    WebcamModule,
    GoogleChartsModule.forRoot(),
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule,
    DataTablesModule,
    NgxPaginationModule,
    NgbModule,
    SocialLoginModule
  ],
  providers: [SharedService,NgxImageCompressService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '318484320693-2drl70bla0cs1ini6l88l3ir8tv5c96p.apps.googleusercontent.com'
            )
          },
        ],
      } as SocialAuthServiceConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SmartrxComponent } from './smartrx/smartrx.component';
import { UploadPrescriptionComponent } from './upload-prescription/upload-prescription.component';
import { UploadRegPrescriptionComponent } from './upload-reg-prescription/upload-reg-prescription.component'
import { ShowRegPrescriptionComponent } from './upload-reg-prescription/show-reg-prescription/show-reg-prescription.component'

const routes: Routes =[
    { path: 'home', component: HomeComponent },
    { path: 'user-profile', component: ProfileComponent },
    { path: 'register', component: SignupComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'smartrx/:rxid', component: SmartrxComponent },
    { path: 'showRxList/:folderid', component: ShowRegPrescriptionComponent },
    {path:'upload-prescription', component:UploadPrescriptionComponent},
    {path:'UploadRegPrescriptionComponent', component:UploadRegPrescriptionComponent},
    { path: '', redirectTo: 'landing', pathMatch: 'full' }
    /*{ path: '', redirectTo: 'home', pathMatch: 'full' }*/
    
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

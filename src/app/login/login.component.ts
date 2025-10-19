import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/message.model';
import { Router } from '@angular/router'
import { Users } from '../models/users.model';
import { GoogleUsers } from '../models/googleUsers.model';
import { AlertService } from '../alert.service';
import { MessageConveyService } from '../messageConveyService.service';
import { SocialAuthService, SocialLoginModule } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SocialLoginModule, SocialAuthService]
})

export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  Continue = false;
  OTPSent = true;
  GoogleLogin = true;
  localStorage: Storage;
  googleUserModel: any = [GoogleUsers];
  googleLoginId = "";

  constructor(private service: SharedService, private formBuilder: FormBuilder, private router: Router, private alertService: AlertService, private messageConveyService: MessageConveyService, private _http: HttpClient
    , private _externalAuthService: SocialAuthService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      MobileNo: ['', Validators.required],
      //title: ['', Validators.required],
      //firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      // validates date format yyyy-mm-dd
      //dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      //email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
      //confirmPassword: ['', Validators.required],
      //acceptTerms: [false, Validators.requiredTrue]
    });

    this.localStorage = window.localStorage;
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    else {
      var val = this.registerForm.value;
      this.service.login(val).subscribe((res: Message) => {
        if (res.MessageType == 1) {
          //console.log(res);
          this.service.getUserInfo(val).subscribe((res: Users) => {
            localStorage.setItem("UserFullName", res.UserFullName);
            localStorage.setItem("UserID", res.UserID.toString());
            localStorage.setItem("Gender", res.Gender);
            localStorage.setItem("MonthOfBirth", res.MonthOfBirth);
            localStorage.setItem("YearOfBirth", res.YearOfBirth);
            this.setConveyMessage(res);
          });
          localStorage.setItem("MobileNo", this.registerForm.controls["MobileNo"].value);
          localStorage.setItem("Password", this.registerForm.controls["Password"].value);          
          this.router.navigate(['/']);
        }
        else {
          this.alertService.error(res.CurrentMessage.toString());
        }
      });
    }

    // display form values on success
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  setConveyMessage(res: any) {
    let message = res;
    this.messageConveyService.setMessage(message);
}

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
    this.OTPSent = true;
    this.GoogleLogin = true;
    this.Continue = false;
    this.googleLoginId = "";
  }

  onContinue() {
    
    if(this.registerForm.controls["MobileNo"].value){
      
      //alert('Please enter the OPT')
      var val = this.registerForm.value;
      this.service.getUserInfo(val).subscribe((res: Users) => {
        if(res){
          this.Continue = true;
          this.OTPSent = false;
          this.GoogleLogin = false;
          //this.service.updatePassword(val.MobileNo);
          this.service.updatePassword(val).subscribe(() => {

          })
          alert('PIN number has been sent to your mobile number. Please enter the PIN.');
        } else{
          alert('User information not found. Please create a new account using the register option.');
          this.router.navigate(['/', 'register']);
        }
        //localStorage.setItem("UserFullName", res.UserFullName);
        //localStorage.setItem("UserID", res.UserID.toString());
        //localStorage.setItem("Gender", res.Gender);
        //this.setConveyMessage(res);
      });
    }
  }

  onGoogleLogIn() {
    var val = this.registerForm.value;
  this.signIn().then(data => {
    this.service.googleLogin(data).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        //console.log(res);
        this.service.getGoogleUserInfo(data).subscribe((res: Users) => {
          localStorage.setItem("UserFullName", res.UserFullName);
          localStorage.setItem("UserID", res.UserID.toString());
          localStorage.setItem("Gender", res.Gender);
          this.setConveyMessage(res);
        });
        localStorage.setItem("MobileNo", this.registerForm.controls["MobileNo"].value);
        localStorage.setItem("Password", this.registerForm.controls["Password"].value);          
        this.router.navigate(['/']);
      }
      else {
        this.alertService.error(res.CurrentMessage.toString());
      }
    });
  }, error => console.log(error))
  }

  signIn(){
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  setLocalStorageValue(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage
  }

  reSendCode() {
    var val = this.registerForm.value;
    if (!val.MobileNo) {
      this.alertService.error("Please enter your mobile no.")
    }
    else {
      this.alertService.success("A verification code has been sent to your mobile no. Please check.")
    }

  }

}

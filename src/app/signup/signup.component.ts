import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router'
import { Message } from '../models/message.model';
import { AlertService } from '../alert.service';
import { Users } from '../models/users.model';
import { MessageConveyService } from '../messageConveyService.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    constructor(private service: SharedService, private router: Router, private alertService: AlertService, private messageConveyService: MessageConveyService) { }

    UserFullName: string;
    MobileNo: string;
    Password: string;
    Gender = "";
    MonthOfBirth = "";
    YearOfBirth: string;
    mdlSampleIsOpen: boolean = false;
    @ViewChild('closeModal') private closeModal: ElementRef;
    //localStorage: Storage;

    ngOnInit() {
        this.SaveUnregisteredUserDataFromStorage();
    }
    addClick() {
        alert("click me");
    }
    signUpUser() {
        if (!this.UserFullName) {
            this.alertService.error("Please enter your name.");
            return;
        }
        if (!this.MobileNo) {
            this.alertService.error("Please enter your mobile number.");
            return;
        }
        if (!this.Gender) {
            this.alertService.error("Please select gender.");
            return;
        }

        var val = {
            UserFullName: this.UserFullName,
            MobileNo: this.MobileNo,
            Password: this.Password,
            Gender: this.Gender,
            MonthOfBirth: this.MonthOfBirth,
            YearOfBirth: this.YearOfBirth
        };

        this.service.userSignUp(val).subscribe((res: Message) => {
            if (res.MessageType == 1) {
                this.openModal(true);
            }
            else {
                this.alertService.error(res.CurrentMessage.toString());
            }
        });
    }

    private openModal(open: boolean): void {
        this.mdlSampleIsOpen = open;
    }

    submitOTP() {
        var val = {
            UserFullName: this.UserFullName,
            MobileNo: this.MobileNo,
            Password: this.Password,
            Gender: this.Gender,
            MonthOfBirth: this.MonthOfBirth,
            YearOfBirth: this.YearOfBirth
        };

        this.service.submitOTP(val).subscribe((res: Message) => {
            if (res.MessageType == 1) {
                this.service.getUserInfo(val).subscribe((res: Users) => {
                    //console.log(res);
                    localStorage.setItem("UserFullName", res.UserFullName);
                    localStorage.setItem("UserFullName", res.UserFullName);
                    localStorage.setItem("UserID", res.UserID.toString());
                    localStorage.setItem("Gender", res.Gender);
                    localStorage.setItem("MobileNo", this.MobileNo);
                    localStorage.setItem("Password", this.Password);
                    this.setConveyMessage(res);
                    //this.SaveUnregisteredUserDataFromStorage();
                });

                this.closeModal.nativeElement.click();
                this.router.navigate(['/', 'landing']);
            }
            else {
                this.alertService.error(res.CurrentMessage.toString());
            }
        });
    }

    setConveyMessage(res: any) {
        let message = res;
        this.messageConveyService.setMessage(message);
    }

    SaveUnregisteredUserDataFromStorage() {
        //var val = JSON.stringify(this.getLocalStorageData());
        //console.log(val);
        var val={
            UserFullName:JSON.stringify(this.getLocalStorageData())
        }
        this.service.SaveUnregisteredUserDataFromStorage(val).subscribe((res: Message) => {
            
        });
    }

    setLocalStorageValue(key: string, value: any): boolean {
        if (this.isLocalStorageSupported) {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
        return false;
    }

    get isLocalStorageSupported(): boolean {
        return !!localStorage
    }

    getLocalStorageValue(key: string): any {
        if (this.isLocalStorageSupported) {
            return JSON.parse(localStorage.getItem(key));
        }
        return null;
    }
    getLocalStorageData() {
       return localStorage.getItem("Uploads");
        // if (!this.localStorage.getItem("Uploads")){
        //     //return (Object.keys(this.getLocalStorageValue("Uploads")));
        //     console.log("Hello:"+this.localStorage.getItem("Uploads"));
        //     return JSON.parse(this.localStorage.getItem("Uploads"));
        // }
        // else
        //     return null;

    }
}

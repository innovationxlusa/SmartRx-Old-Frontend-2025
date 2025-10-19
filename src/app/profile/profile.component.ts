import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/message.model';
import { Users } from '../models/users.model';
import { UserProfile } from '../models/UserProfile.model';
import { AlertService } from '../alert.service';
import { ActivityReward } from '../models/activityReward.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
    UserID = "";
    UserFullName = "";
    MobileNo = "";
    MobileNoText = "";
    Gender = "";
    GenderText = "";
    MonthOfBirth = "";
    MonthOfBirthName = "";
    YearOfBirth = "";
    FileCount = "";
    FolderCount = "";
    SmartRXCount = "";
    dateOfBirth: Date;
    Age = "";
    EmailAddress = "";
    EmailAddressText = "";
    ActivityPoints = "";
    activityReward: any = [ActivityReward];
  
    constructor(private service: SharedService, private formBuilder: FormBuilder, private alertService: AlertService) { }

    ngOnInit() {
        this.UserID = localStorage.getItem("UserID");
        this.service.getProfileDetails(this.UserID).subscribe((res: UserProfile) => {
              //console.log(res);
                this.UserFullName = res.UserFullName;
                this.MobileNo = res.MobileNo;
                if(res.MobileNo){
                    this.MobileNoText = "Mobile No: " + res.MobileNo;
                } 
                this.Gender = res.Gender;
                if(res.Gender){
                    this.GenderText = "Gender: " + res.Gender;
                }
                
                if(res.MonthOfBirth = "01"){
                    this.MonthOfBirthName = "January";
                } else if(res.MonthOfBirth = "02"){
                    this.MonthOfBirthName = "February";
                } else if(res.MonthOfBirth = "03"){
                    this.MonthOfBirthName = "March";
                } else if(res.MonthOfBirth = "04"){
                    this.MonthOfBirthName = "April";
                } else if(res.MonthOfBirth = "05"){
                    this.MonthOfBirthName = "May";
                } else if(res.MonthOfBirth = "06"){
                    this.MonthOfBirthName = "June";
                } else if(res.MonthOfBirth = "07"){
                    this.MonthOfBirthName = "July";
                } else if(res.MonthOfBirth = "08"){
                    this.MonthOfBirthName = "August";
                } else if(res.MonthOfBirth = "09"){
                    this.MonthOfBirthName = "September";
                } else if(res.MonthOfBirth = "10"){
                    this.MonthOfBirthName = "October";
                } else if(res.MonthOfBirth = "11"){
                    this.MonthOfBirthName = "November";
                } else if(res.MonthOfBirth = "12"){
                    this.MonthOfBirthName = "December";
                }

                if(res.YearOfBirth){
                    this.dateOfBirth = new Date(parseInt(res.YearOfBirth), parseInt(res.MonthOfBirth), 1);
                    let timeDiff = Math.abs(Date.now() - this.dateOfBirth.getTime());
                    this.Age = ", " +  Math.floor((timeDiff / (1000 * 3600 * 24))/365.25).toString();
                }
                if(res.EmailAddress){
                    this.EmailAddressText = "e-mail: " + res.EmailAddress;
                }

                this.EmailAddress = res.EmailAddress;
                this.MonthOfBirth = res.MonthOfBirth;
                this.YearOfBirth = res.YearOfBirth;
                this.FileCount = res.FileCount;
                this.FolderCount = res.FolderCount;
                this.SmartRXCount = res.SmartRXCount;
                this.ActivityPoints = res.ActivityPoints;
              });
    }

    updateProfile(){
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
            UserID: this.UserID,
            UserFullName: this.UserFullName,
            MobileNo: this.MobileNo,
            EmailAddress: this.EmailAddress,
            Gender: this.Gender,
            MonthOfBirth: this.MonthOfBirth,
            YearOfBirth: this.YearOfBirth
        };

        this.service.updateProfile(val).subscribe((res: Message) => {
            if (res.MessageType == 1) {
                document.getElementById("BtnCloseModal").click();
                this.ngOnInit();
            }
            else {
                this.alertService.error(res.CurrentMessage.toString());
            }
        });
    }

    showRewardPointList(){
        this.service.showRewardPointList(this.UserID).subscribe((res: ActivityReward) => {
            this.activityReward = res;
        });
    }

}

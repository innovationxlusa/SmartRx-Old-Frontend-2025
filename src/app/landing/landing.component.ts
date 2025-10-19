import { Component, OnInit } from '@angular/core';
import { MessageConveyService } from 'src/app/messageConveyService.service';
import { Users } from 'src/app/models/users.model';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any; 
  UserFullName:string;
  UserId:string;

  constructor(private messageConveyService: MessageConveyService) { }

  ngOnInit() {
   
    //location.reload();  
    this.messageConveyService.message.subscribe(
      (res: Users) => {
        //console.log(res);
          if (res != null) {
              this.UserFullName = res.UserFullName;
              this.UserId = res.UserID.toString();
          }
          else {
              var usrFullName = (localStorage.getItem("UserFullName") == null) ? "" : localStorage.getItem("UserFullName");
              this.UserFullName = usrFullName;//JSON.parse(localStorage.getItem("UserFullName"));//"Nur";//this.localStorage.getItem("MobileNo").toString(); 
              //console.log(this.UserFullName);
          }
      }
  )
    this.UserId=localStorage.getItem("UserID");//(localStorage.getItem("UserID")==null)?"":localStorage.getItem("UserID");    
     
    if(this.UserId==""||this.UserId==null){      
       this.UserId=null;
    }    
    else{        
        this.UserId=localStorage.getItem("UserID");
    } 
    //console.log(this.UserId);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { SharedService } from 'src/app/shared.service'
import { MessageConveyService } from 'src/app/messageConveyService.service';
import { Users } from 'src/app/models/users.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    localStorage: Storage;
    UserFullName: string;
    UserId: string;


    constructor(public location: Location, private router: Router, private service: SharedService, private messageConveyService: MessageConveyService) {
    }

    ngOnInit() {

        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });


        this.messageConveyService.message.subscribe(
            (res: Users) => {
                if (res != null) {
                    this.UserFullName = res.UserFullName;
                    this.UserId = res.UserID.toString();                 
                }
                else {
                    var usrFullName =localStorage.getItem("UserFullName"); //(localStorage.getItem("UserFullName") == null) ? "" : localStorage.getItem("UserFullName");
                    this.UserFullName = usrFullName;//JSON.parse(localStorage.getItem("UserFullName"));//"Nur";//this.localStorage.getItem("MobileNo").toString(); 
                    //console.log(this.UserFullName);
                }
            }
        )

        var usrFullName =localStorage.getItem("UserFullName"); //(localStorage.getItem("UserFullName") == null) ? "" : localStorage.getItem("UserFullName");
        this.UserFullName = usrFullName;//JSON.parse(localStorage.getItem("UserFullName"));//"Nur";//this.localStorage.getItem("MobileNo").toString(); 
        
        if (this.UserFullName == ""||this.UserFullName == null) {
            this.UserFullName = "Guest User";
            this.UserId = null;
        }       
        else {
            this.UserFullName = "Hi! " + this.UserFullName;
            this.UserId = localStorage.getItem("UserID");
        }

    }

    get isLocalStorageSupported(): boolean {
        return !!this.localStorage
    }

    getLocalStorageValue(key: string): any {
        if (this.isLocalStorageSupported) {
            return JSON.parse(this.localStorage.getItem(key));
        }
        return null;
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '#/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '#/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        // remove user from local storage and set current user to null
        //localStorage.removeItem('user');  
        //alert("Hi");  

        var val = {
            MobileNo: "XXX",
            Password: "XXX"
        };
        this.service.getUserInfo(val).subscribe((res: Users) => {
            this.setConveyMessage(res);
        });
        localStorage.clear();
        this.router.navigate(['/']);
        location.reload();
    }

    showProfile(){
        //alert('Y');
    }

    setConveyMessage(res: any) {
        let message = res;
        this.messageConveyService.setMessage(message);
    }
}

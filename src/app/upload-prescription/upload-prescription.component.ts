import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-prescription',
  templateUrl: './upload-prescription.component.html',
  styleUrls: ['./upload-prescription.component.css']
})
export class UploadPrescriptionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    var val=(localStorage.getItem("UserID")==null?"":localStorage.getItem("UserID").toString());
    //console.log(val);
     if (val) {      
      this.router.navigate(['/', 'UploadRegPrescriptionComponent']);
      return;
     }
  }

}

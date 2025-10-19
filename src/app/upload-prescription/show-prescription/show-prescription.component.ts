import { Component, OnInit } from '@angular/core';
import{SharedService} from 'src/app/shared.service'

@Component({
  selector: 'app-show-prescription',
  templateUrl: './show-prescription.component.html',
  styleUrls: ['./show-prescription.component.css']
})
export class ShowPrescriptionComponent implements OnInit {

  constructor(private service:SharedService) { }

  prescriptionList:any=[];
  
  ngOnInit(): void {
    this.refreshPrescriptionList();
  }

  refreshPrescriptionList(){
    this.service.getPrescriptionList().subscribe(data=>{
      this.prescriptionList=data;
    });
  }

}

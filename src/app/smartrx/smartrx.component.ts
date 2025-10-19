import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/message.model';
import { Users } from '../models/users.model';
import { UserProfile } from '../models/UserProfile.model';
import { SmartRxMaster } from '../models/smartRxMaster.model';
import { MedicineInfo } from '../models/medicineInfo.model';
import { InvestigationInfo } from '../models/investigationInfo.model';
import { Doctor } from '../models/doctor.model';
import { Visit } from '../models/visits.model';
import { SmartRXMedicineDetails } from '../models/smartRXMedicineDetails.model';
import { SmartRXInvestigationDetails } from '../models/smartRXInvestigationDetails.model';
import { DiagonosticTestCenter } from '../models/diagonosticTestCenter.model';
import { Vitals } from '../models/vitals.model';
import { SmartRxConfiguration } from '../models/smartRxConfiguration.model';
import { AlertService } from '../alert.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AUTO_STYLE, style } from '@angular/animations';
import { GoogleChartsModule } from 'angular-google-charts';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { flatten } from '@angular/compiler';
import { DecimalPipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot }  from '@angular/router';
import { RxSummary } from '../models/rxsummary.model';
import { RatingModule } from 'ng-starrating';
import { BrowserModule } from '@angular/platform-browser';
import { StarRatingModule } from 'angular-star-rating';
import * as Highcharts from 'highcharts';
import * as CryptoJS from 'crypto-js'; 


@Component({
    selector: 'app-smartrx',
    templateUrl: './smartrx.component.html',
    styleUrls: ['./smartrx.component.css']
})

export class SmartrxComponent implements OnInit {
    
    UserID = "";
    FolderName = "";
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
    PatientName = "";
    MedicineIDForSorting = "";
    DoctorName = "";
    ChemberName = ""; 
    DoctorSpecialization = "";
    ContactNo = "";
    DoctorDesignation = "";
    DoctorDepartment = "";
    BMDCRegistrationNo = "";
    Address1 = "";
    Address2 = "";
    Area = "";
    PostalCode = "";
    District = "";
    PrescriptionDate = "";
    ChiefComplaint = "";
    PastIllness  = "";
    MedicineHistory = "";
    PastInvestigationRecord = "";
    Advice = "";
    Restrictions = "";
    NextAppointmentDate = "";
    NextAppointmentTime = ""; 
    PresentIllness = "";
    GeneralExamination = "";
    SystemicExamination = "";
    Diagonosis = "";
    rxId = "";
    ProductID = "";
    ProductName = "";
    UnitCost = "";
    Indication = "";
    Pharmacology = "";
    DoseDescription = "";
    Administration = "";
    Contradication = "";
    SideEffects = "";
    PrecautionsAndWarnings = "";
    PregnancyAndLactation = "";
    ModeOfAction = "";
    Interaction = "";
    OverdoseEffects = "";
    TherapeuticClass = "";
    StorageConditions = "";
    UnitQuantity = "";
    Unit = "";
    PackType = "";
    PackSize = "";
    DARNo = "";
    Strength = "";
    CategoryID = "";
    Category = "";
    GenericID = "";
    Generic = "";
    ManufacturerID = "";
    Manufacturer = "";
    Price = "";
    LabInvestigationName = "";
    IsSelectedCenterExists = false;
    SelectedCenterAddress = "";
    SelectedCenterArea = "";
    SelectedCenterMobileNo = "";
    SelectedCenterPhoneNo = "";
    SelectedCenterWebAddress = "";
    allFileList: any = [SmartRXMedicineDetails];
    allVitalsList: any = [Vitals];
    allVitals: any = [Vitals];
    specificVital: any = [Vitals];
    allFileListWithPrice: any = [SmartRXMedicineDetails];
    allLabListWithPrice: any = [SmartRXInvestigationDetails];
    myDoctors: any = [Doctor];
    myVisits: any = [Visit];
    alternateMedicines: any = [MedicineInfo];
    myFavouriteMedicines: any = [MedicineInfo];
    myFavouriteLabs: any = [DiagonosticTestCenter];
    faqList: any = [MedicineInfo];
    labFaqList: any = [MedicineInfo];
    allDiagonosticTestCenterList: any = [DiagonosticTestCenter];
    filteredDiagonosticTestCenterList: any = [DiagonosticTestCenter];
    selectedCenterForComparison: any = [DiagonosticTestCenter];
    labComparisonOverall: any = [DiagonosticTestCenter];
    labComparisonTest: any = [DiagonosticTestCenter];
    labComparisonTestSummary: any = [DiagonosticTestCenter];
    IsDetailsCheckedVitals: boolean;
    IsPriceChecked: boolean;
    IsPriceCheckedLab: boolean;
    IsPriceCheckedLabNational: boolean;
    IsPriceCheckedAlternateMed: boolean;
    IsFavouriteMedicineExists: boolean = false;
    SelectedMedicineID = "";
    SelectedMedicineName = "";
    SelectedMedicineGeneric = "";
    SelectedMedicineCategory = "";
    SelectedMedicineManufacturar = "";
    SelectedMedicineStrength = "";
    SelectedMedicinePrice = "";
    CurrentGenericID = "";
    selectedCenter = null;
    IsVitalStatisticsExists:boolean;
    NoOfVitalStatistics = "";
    IsMedicineExists:boolean;
    NoOfMedicine:string;
    IsLabInvestigationExists:boolean;
    NoOfLabInvestigation:string;
    IsAdviceExists:boolean;
    IsComparePossible:boolean = false;
    IsFavouritesExists:boolean;
    VisitFee:string;
    TransportCost:string;
    Note:string;
    WaitingTime:string;
    ConsultingTime:string;
    TotalMedicineCost: string;
    TotalLabCost: string;
    vitalselection: string;
    ConfigIsPatientExists:boolean = false;
    ConfigIsDoctorExists:boolean = false;
    ConfigIsAdviceExists:boolean = false;
    ConfigIsVitalExists:boolean = false;
    ConfigIsMedicineExists:boolean = false;
    ConfigIsInvestigationExists:boolean = false;
    ConfigIsFavouriteExists:boolean = false;
    config: any;
    configMed: any;
    collection = { count: 60, data: [] };
    myType = 'PieChart';
    myData = [];
    options = {    
      //is3D:true,
      pieHole: 0.4,
      colors: ['#19194d', '#4040bf', '#8c8cd9','#b3b3e6']
   };
   title = '';
   height=300;
   //width=500;
   maxtempateture: number = 0;
   mintempateture: number = 0;
   readingtempateture: number = 0;
    highcharts = Highcharts;
    chartOptions = {   
           chart: {
              type: "bar"
           },
           title: {
              text: "Test Chart"
           },
           xAxis:{
            categories: ['']
           },
           tooltip: {
              valueSuffix:""
           },
           plotOptions: {
            series: {
                pointWidth: 15
            }
        },
           series: [ {
            name: 'high',
            stacking: true,
            color: 'red',
            data: [
                [99]
            ]
        }, {
            name: 'normal',
            stacking: true,
            color: 'green',
            data: [
                [3.2]
            ]
        }, {
            stacking: true,
            name: 'low',
            color: 'orange',
            data: [
                [95.8]
            ]
        }, {
          type: 'scatter',
          name: 'reading',
          color: 'black',
          data: [
              [102]
          ]
      }]
    };

    constructor(private service: SharedService, private formBuilder: FormBuilder, private alertService: AlertService, private route: ActivatedRoute, private router: Router, private locationStrategy: LocationStrategy, private location: Location) {
      history.pushState(null, null, window.location.href);
      this.locationStrategy.onPopState(() => {  
        if(document.getElementById('modal-form-addvisitfee').style.display == 'block'){
          document.getElementById("BtnCloseVisitFeeModal").click();
          history.pushState(null, null, window.location.href);
        } else if(document.getElementById('modal-form-share').style.display == 'block'){
          document.getElementById("BtnCloseViewModal").click();
          history.pushState(null, null, window.location.href);
        } else if(document.getElementById('modal-form-myvisit').style.display == 'block'){
          document.getElementById("BtnCloseMyVisitModal").click();
          history.pushState(null, null, window.location.href);
        } else if(document.getElementById('modal-form-addnotes').style.display == 'block'){
          document.getElementById("BtnCloseAddNotesModal").click();
          history.pushState(null, null, window.location.href);
        } else if(document.getElementById('modal-form-addtransportcost').style.display == 'block'){
          document.getElementById("BtnCloseAddTransportCostModal").click();
          history.pushState(null, null, window.location.href);
        } else if(document.getElementById('modal-form-medicineinfo').style.display == 'block'){
          document.getElementById("BtnCloseMedicineInfoModal").click();
          history.pushState(null, null, window.location.href);
        } else if(document.getElementById('modal-form-alternativemedicine').style.display == 'block'){
          document.getElementById("BtnCloseAlternativeMedicineModal").click();
          history.pushState(null, null, window.location.href);
        }else if(document.getElementById('modal-form-labcomparison').style.display == 'block'){
          document.getElementById("BtnCloseLabComparisonModal").click();
          history.pushState(null, null, window.location.href);
        }else if(document.getElementById('modal-form-addvitals').style.display == 'block'){
          document.getElementById("BtnCloseAddVitalsModal").click();
          history.pushState(null, null, window.location.href);
        }else if(document.getElementById('modal-form-labinfo').style.display == 'block'){
          document.getElementById("BtnCloseLabInfoModal").click();
          history.pushState(null, null, window.location.href);
        }else if(document.getElementById('modal-form-addconsultingtime').style.display == 'block'){
          document.getElementById("BtnCloseAddConsultingTimeModal").click();
          history.pushState(null, null, window.location.href);
        }else if(document.getElementById('modal-form-addwaitingtime').style.display == 'block'){
          document.getElementById("BtnCloseAddWaitingTimeModal").click();
          history.pushState(null, null, window.location.href);
        }else if(document.getElementById('modal-form-report').style.display == 'block'){
          document.getElementById("BtnCloseReportModal").click();
          history.pushState(null, null, window.location.href);
        }
    });
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.filteredDiagonosticTestCenterList.count 
    };

    this.configMed = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.filteredDiagonosticTestCenterList.count 
    };
     }

    dtTrigger: Subject<any> = new Subject<any>();

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
    
    ngOnInit() {
        var data = {
          FolderName: this.route.snapshot.paramMap.get('rxid'),
          };
        this.service.GetSmartRxConfiguration(data).subscribe(res => {
          this.ConfigIsPatientExists = res.IsPatientExists;
          this.ConfigIsDoctorExists = res.IsDoctorExists;
          this.ConfigIsAdviceExists = res.IsAdviceExists;
          this.ConfigIsFavouriteExists = res.IsFavouriteExists;
          this.ConfigIsMedicineExists = res.IsMedicineExists;
          this.ConfigIsInvestigationExists = res.IsInvestigationExists;
          this.ConfigIsVitalExists = res.IsVitalExists;
        });

        this.service.GetSmartRXMaster(data).subscribe((res: SmartRxMaster) => {
              //console.log(res);
                var address = "";
                if(res.Address2){
                  address = res.Address1 + ', ' + res.Address2;
                } else{
                  address = res.Address1;
                }
                var date = "";
                if(res.PrescriptionDate){
                  date = res.PrescriptionDate.substring(0, 9);
                }
                var nextAppointmentDate = "";
                if(res.NextAppointmentDate){
                  nextAppointmentDate = (res.NextAppointmentDate.substring(0, 9)).toString();
                }
                this.PatientName = res.PatientName;
                this.PresentIllness = res.PresentIllness;
                this.GeneralExamination = res.GeneralExamination;
                this.SystemicExamination = res.SystemicExamination;
                this.Diagonosis = res.Diagonosis;
                this.PrescriptionDate = date;
                this.DoctorName = res.DoctorName;
                this.MedicineHistory = res.MedicineHistory;
                this.Age = res.Age;
                this.DoctorSpecialization = res.DoctorSpecialization;
                this.DoctorDepartment = res.DoctorDepartment;
                this.DoctorDesignation = res.DoctorDesignation;
                this.BMDCRegistrationNo = res.BMDCRegistrationNo;
                this.ChiefComplaint = res.ChiefComplaint;
                this.PastIllness = res.PastIllness;
                this.Diagonosis = res.Diagonosis;
                this.Gender = res.Gender;
                this.ChemberName = res.ChemberName;
                this.Address1 = address;
                this.ContactNo = res.ContactNo;
                this.Advice = res.Advice;
                this.Restrictions = res.Restrictions;
                this.NextAppointmentDate = nextAppointmentDate;
              });
              this.loadSummary();
        this.service.GetSmartRXMedicineDetailsWithPrice(data).subscribe(data => {
          this.allFileList = data;
          this.dtTrigger.next();
        });

        this.service.GetSmartRXMedicineDetailsWithPrice(data).subscribe(data => {
          this.allFileListWithPrice = data;
        });

        this.service.GetSmartRXVitals(data).subscribe(data => {
          this.allVitalsList = data;
        });

        this.service.GetAllTestCenter(data).subscribe(data => {
          this.allDiagonosticTestCenterList = data;
        });

        this.service.GetAllVitals(data).subscribe(data => {
          this.allVitals = data;
        });

        this.loadLabInvestigation();
        this.loadmyfavourites();
        this.loadPieChart();
    }

    loadLabInvestigation(){
      var center = '';
      if(this.selectedCenter){
        center = this.selectedCenter;
        this.loadCenterInfo();
      } else{
        this.IsSelectedCenterExists = false;
      }
      var data = {
        FolderID: this.route.snapshot.paramMap.get('rxid'),
        FolderName: center,
        };


      this.service.GetSmartRXInvestigationDetailsWithPrice(data).subscribe(data => {
        this.allLabListWithPrice = data;
      });
    };

    loadCenterInfo(){
      var data = {
        FolderName: this.selectedCenter,
        };

      this.service.GetCenterDetails(data).subscribe(data => {
        if(data){
          this.IsSelectedCenterExists = true;
        } else{
          this.IsSelectedCenterExists = false;
        }
        this.SelectedCenterAddress = data.Address;
        this.SelectedCenterArea = data.Area;
        this.SelectedCenterMobileNo = data.MobileNo;
        this.SelectedCenterPhoneNo = data.PhoneNo;
        this.SelectedCenterWebAddress = data.WebAddress;
      });
    };

    loadSummary(){
      var data = {
        FolderName: this.route.snapshot.paramMap.get('rxid')
        };
            this.service.GetRxSummary(data).subscribe((res: RxSummary) => {
              //console.log(res);
                this.IsVitalStatisticsExists = res.IsVitalStatisticsExists;
                this.NoOfVitalStatistics = res.NoOfVitalStatistics;
                this.IsMedicineExists = res.IsMedicineExists;
                this.NoOfMedicine = res.NoOfMedicine;
                this.IsLabInvestigationExists = res.IsLabInvestigationExists;
                this.NoOfLabInvestigation = res.NoOfLabInvestigation;
                this.IsAdviceExists = res.IsAdviceExists;
                this.VisitFee = res.VisitFee;
                this.IsFavouritesExists = res.IsFavouritesExists;
                this.TransportCost = res.TransportCost;
                this.Note = res.Note;
                this.WaitingTime = res.WaitingTime;
                this.ConsultingTime = res.ConsultingTime;
                this.TotalLabCost = res.TotalLabCost;
                this.TotalMedicineCost = res.TotalMedicineCost;
              });

    };

    updateUserInput(){
      var visitFee = $('#txtVisitFee').val();
      var transportCost = $('#txtTransportCost').val();
      var waitingTime = $('#txtWaitingTime').val();
      var consultingTime = $('#txtConsultingTime').val();

      if(!visitFee || !transportCost){
        visitFee = this.VisitFee;
        transportCost = this.TransportCost;
      }

      if(!waitingTime || !consultingTime){
        waitingTime = this.WaitingTime;
        consultingTime = this.ConsultingTime;
      }

      var data = {
        PrescriptionID: this.route.snapshot.paramMap.get('rxid'),
        VisitFee: visitFee,
        TransportCost: transportCost,
        WaitingTime: waitingTime,
        ConsultingTime: consultingTime,
        Note: $('#txtNote').val(),
        };
            this.service.UpdateUserInput(data).subscribe((res) => {
              document.getElementById("BtnCloseAddNotesModal").click();
              this.loadSummary();
              this.loadPieChart();
              document.getElementById("BtnCloseUserInputModal").click();
              document.getElementById("BtnCloseAddConsultingTimeModal").click();
              document.getElementById("BtnCloseAddWaitingTimeModal").click();
              document.getElementById("BtnCloseAddTransportCostModal").click();
              document.getElementById("BtnCloseVisitFeeModal").click();
            });
    };

    loadmyfavourites(){
      var data = {
        FolderID: this.route.snapshot.paramMap.get('rxid'),
        FolderName: 'Medicine'
        };

      this.service.GetMyFavouriteMedicines(data).subscribe(data => {
        this.myFavouriteMedicines = data;
      });
      var data1 = {
        FolderID: this.route.snapshot.paramMap.get('rxid'),
        FolderName: 'Lab'
        };
      this.service.GetMyFavouriteLabs(data1).subscribe(data => {
        this.myFavouriteLabs = data;
      });
    };

    pageChanged(event){
      this.config.currentPage = event;
    }

    pageChangedMed(event){
      this.configMed.currentPage = event;
    }

    loadPieChart(){
      var chartData = [];
      var data = {
        FolderName: this.route.snapshot.paramMap.get('rxid')
        };
      this.service.GetSmartRxChart(data).subscribe(res => {
        chartData.push(['Medicine',res.Medicine]);
        chartData.push(['Lab',res.Lab]);
        chartData.push(['Visit',res.Visit]);
        chartData.push(['Transport',res.Transport]);
        this.title = "Cost Distribution (Total Cost: ৳" + res.Total + ")";
        if(chartData.length > 0){
          this.myData = [];
          this.myData = chartData;
        } else{
          this.myData.push(['No Data Found',100.0]);
        }
      });
    };

    loadVitals(){
      var data = {
        FolderName: this.route.snapshot.paramMap.get('rxid')
        };
      this.service.GetSmartRXVitals(data).subscribe(data => {
        this.allVitalsList = data;
      });
    };

    toggleChevron = function(x) {
      document.getElementById('tup').classList.toggle("fa-caret-up");
      var div = document.getElementById('divMedicineSummary');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
      //$("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    }

    toggleLab = function(x) {
      document.getElementById('tul').classList.toggle("fa-caret-up");
      var div = document.getElementById('divLabSummary');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
      //$("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    }

    togglePersonalInfo = function(x) {
      document.getElementById('iPersonalInfo').classList.toggle("fa-caret-up");
      var div = document.getElementById('divPersonalInfo');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
      //$("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    }

    togglePatientHistory = function(x) {
      document.getElementById('iPatientHistory').classList.toggle("fa-caret-up");
      var div = document.getElementById('divPatientHistory');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
      //$("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    }

    toggleVitalStatistics = function(x) {
      document.getElementById('iVitalStatistics').classList.toggle("fa-caret-up");
      var div = document.getElementById('divVitalStatistics');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
      //$("i", this).toggleClass("icon-circle-arrow-up icon-circle-arrow-down");
    }

    onCLickMenu(val : any){
      this.IsPriceChecked = false;
      this.IsPriceCheckedLab = false;
      this.IsPriceCheckedLabNational = false;
      document.getElementById('divMedicineRx').style.display = 'block';
        document.getElementById('divMedicineCostDetails').style.display = 'none';
        document.getElementById('divLab').style.display = 'block';
        document.getElementById('divLabWithPrice').style.display = 'none';
        document.getElementById('divBackToSummary').style.display = 'none';
        document.getElementById('divBackToSummaryFromLab').style.display = 'none';
      $('html, body').animate({
        scrollTop: $("#div" + val).offset().top   //id of div to be scrolled
      }, 1000);
    };

    onCLickMedicineCost(val : any){
      this.IsPriceChecked = true;
      document.getElementById('divMedicineRx').style.display = 'none';
      document.getElementById('divMedicineCostDetails').style.display = 'block';
      $('html, body').animate({
        scrollTop: $("#div" + val).offset().top   //id of div to be scrolled
      }, 1000);
      document.getElementById('divBackToSummary').style.display = 'block';
    };

    onCLickMedicine(val : any){
      this.IsPriceChecked = false;
      document.getElementById('divMedicineRx').style.display = 'block';
      document.getElementById('divMedicineCostDetails').style.display = 'none';
      $('html, body').animate({
        scrollTop: $("#div" + val).offset().top   //id of div to be scrolled
      }, 1000);
      document.getElementById('divBackToSummary').style.display = 'block';
    };

    onCLickLabInvestigationCost(val : any){
      this.IsPriceCheckedLabNational = true;
      document.getElementById('divLab').style.display = 'none';
      document.getElementById('divLabWithPrice').style.display = 'block';
      $('html, body').animate({
        scrollTop: $("#div" + val).offset().top   //id of div to be scrolled
      }, 1000);
      document.getElementById('divBackToSummaryFromLab').style.display = 'block';
    };

    onCLickLabInvestigation(val : any){
      this.IsPriceCheckedLabNational = false;
      document.getElementById('divLab').style.display = 'block';
      document.getElementById('divLabWithPrice').style.display = 'none';
      $('html, body').animate({
        scrollTop: $("#div" + val).offset().top   //id of div to be scrolled
      }, 1000);
      document.getElementById('divBackToSummaryFromLab').style.display = 'block';
    };

    showMyDoctors(){
      this.rxId = this.route.snapshot.paramMap.get('rxid');
      var data = {
        FolderName: this.route.snapshot.paramMap.get('rxid')
        };

        this.service.GetMyDoctors(data).subscribe((res: any) => {
          this.myDoctors = res;
        });
    };

    onShowDoctorVisit(name){
      var div = document.getElementById(name);
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
    };
    
    increment(name, incValue){
      var val: number = +($('#'+name).val());
      var inc: number = +incValue;
      if(!val){
        val = 0;
      }
      if(!incValue){
        incValue = 1;
      }
      $('#'+name).val(val+inc)
      if(name=='medQuantity'){
        this.showpricecomparisonmedicine('N');
      }
    };

    decrease(name, incValue){
      var val: number = +($('#'+name).val());
      var inc: number = +incValue;
      if(!val){
        val = 0;
      }
      if(!incValue){
        incValue = 1;
      }
      var newVal = val-inc;
      if(newVal < 0){
        newVal=0;
      }
      $('#'+name).val(newVal)
      if(name=='medQuantity'){
        this.showpricecomparisonmedicine('N')
      }
    };

    checkValue(event: any){
      if(event.srcElement.checked){
        document.getElementById('divMedicineRx').style.display = 'none';
        document.getElementById('divMedicineCostDetails').style.display = 'block';
      }else{
        document.getElementById('divMedicineRx').style.display = 'block';
        document.getElementById('divMedicineCostDetails').style.display = 'none';
      }
   }

   checkValueTotalMedicine(event: any){
    if(event.srcElement.checked){
      var data = {
        FolderName: this.route.snapshot.paramMap.get('rxid'),
        Description: this.SelectedMedicineID
        };
      this.service.GetMedicineQuantity(data).subscribe(data => {
        $('#medQuantity').val(data);
        this.showpricecomparisonmedicine('N');
      });
    } else{
      $('#medQuantity').val(1);
        this.showpricecomparisonmedicine('N');
    }
   };

   checkValueVitals(event: any){
    if(event.srcElement.checked){
      document.getElementById('divVitalStatistics').style.display = 'none';
      document.getElementById('divVitalStatisticsDetails').style.display = 'block';
    }else{
      document.getElementById('divVitalStatistics').style.display = 'block';
      document.getElementById('divVitalStatisticsDetails').style.display = 'none';
    }
 }

   checkValueLab(event: any){
    if(event.srcElement.checked){
      document.getElementById('divLab').style.display = 'none';
      document.getElementById('divLabWithPrice').style.display = 'block';
    }else{
      document.getElementById('divLab').style.display = 'block';
      document.getElementById('divLabWithPrice').style.display = 'none';
    }
 }

 checkValueLabNational(event: any){
  if(event.srcElement.checked){
    document.getElementById('divLab').style.display = 'none';
    document.getElementById('divLabWithPrice').style.display = 'block';
  }else{
    document.getElementById('divLab').style.display = 'block';
    document.getElementById('divLabWithPrice').style.display = 'none';
  }
};

 checkValueAlternateMed(event: any){
  if(event.srcElement.checked){
    document.getElementById('divAlternateMedicineWithoutPrice').style.display = 'none';
    document.getElementById('divAlternateMedicineWithPrice').style.display = 'block';
  }else{
    document.getElementById('divAlternateMedicineWithoutPrice').style.display = 'block';
    document.getElementById('divAlternateMedicineWithPrice').style.display = 'none';
  }
}

   showMedicineInfo(productId){
     var data = {
      FolderName: productId
      };
    this.service.GetMedicineInfo(data).subscribe((res: MedicineInfo) => {
      this.ProductID = res.ProductID;
      this.ProductName = res.ProductName;
      this.UnitCost = res.UnitCost;
      this.Indication = res.Indication;
      this.Pharmacology = res.Pharmacology;
      this.DoseDescription = res.DoseDescription;
      this.Administration = res.Administration;
      this.Contradication = res.Contradication;
      this.SideEffects = res.SideEffects;
      this.PrecautionsAndWarnings = res.PrecautionsAndWarnings;
      this.PregnancyAndLactation = res.PregnancyAndLactation;
      this.ModeOfAction = res.ModeOfAction;
      this.Interaction = res.Interaction;
      this.OverdoseEffects = res.OverdoseEffects;
      this.TherapeuticClass = res.TherapeuticClass;
      this.StorageConditions = res.StorageConditions;
      this.UnitQuantity = res.UnitQuantity;
      this.Unit = res.Unit;
      this.PackType = res.PackType;
      this.PackSize = res.PackSize;
      this.DARNo = res.DARNo;
      this.Strength = res.Strength;
      this.CategoryID = res.CategoryID;
      this.Category = res.Category;
      this.GenericID = res.GenericID;
      this.Generic = res.Generic;
      this.ManufacturerID = res.ManufacturerID;
      this.Manufacturer = res.Manufacturer;
      this.Price = res.Price;
      });
      this.service.GetMedicineFAQ(data).subscribe((res: MedicineInfo) => {
        this.faqList = res;
      });
   };

   showLabInfo(testId, testName){
    this.LabInvestigationName = testName;
    var data = {
     FolderName: testId
     };
     this.service.GetLabFAQ(data).subscribe((res: InvestigationInfo) => {
       this.labFaqList = res;
     });
  };

  showhidelabinfo(n){
    document.getElementById('il'+n).classList.toggle("fa-caret-up");  
    var div = document.getElementById('divl'+n);
  if (div.style.display !== 'none') {
      div.style.display = 'none';
    }
    else {
      div.style.display = 'block';
    }
  };

   showhidemedicineinfo(n){
    document.getElementById('i'+n).classList.toggle("fa-caret-up");  
      var div = document.getElementById('div'+n);
    if (div.style.display !== 'none') {
        div.style.display = 'none';
        
    }
    else {
      div.style.display = 'block';
        
    }
   };
   

   // Draw the chart and set the chart values

findVisitDetailsByDoctorsName(data) {
  var data1 = {
    FolderName: this.route.snapshot.paramMap.get('rxid'),
    Description: data.DoctorsName
    };

    this.service.GetMyVisitsByDoctors(data1).subscribe((res: any) => {
      this.myVisits = res;
    });
  return this.myVisits;
};

showMyVisits(){
  var data = {
    FolderName: this.route.snapshot.paramMap.get('rxid')
    };

  this.service.GetMyVisits(data).subscribe(data => {
    this.myVisits = data;
  });
};

onClickBlog(){
alert("No relevent content available.");
};

showalternativemedicine(val : any){
  this.MedicineIDForSorting = val;
  this.IsPriceCheckedAlternateMed = true;
  document.getElementById('divAlternateMedicineWithoutPrice').style.display = 'block';
  document.getElementById('divAlternateMedicineWithPrice').style.display = 'none';
  var data = {
    FolderName: val
    };
  this.service.GetSpecificMedicineDetails(data).subscribe((res: MedicineInfo) => {
        //console.log(res);
          this.SelectedMedicineID = res.ProductID;
          this.SelectedMedicineName = res.ProductName;
          this.SelectedMedicineCategory = res.Category;
          this.SelectedMedicineGeneric = res.Generic;
          this.SelectedMedicineManufacturar = res.Manufacturer;
          this.SelectedMedicineStrength = res.Strength;
          this.CurrentGenericID = res.GenericID;
          this.SelectedMedicinePrice = res.Price;
          this.reloadMedicineListForSorting();
        });

};

reloadMedicineListForSorting(){
  var folderId = $('#medQuantity').val();
  var userId = $('#sortMed').val();
  
          var newData = {
            FolderName: this.MedicineIDForSorting,
            Description: this.CurrentGenericID,
            FolderID: folderId,
            UserID: userId
            };

          this.service.GetMedicineDetailsByGeneric(newData).subscribe(data => {
            this.alternateMedicines = data;
          });
};

showpricecomparisonmedicine(val: any){
  if(val=='N'){
    val = this.SelectedMedicineID;
  } else{
    $('#medQuantity').val(1);
  }
  this.MedicineIDForSorting = val;
  this.IsPriceCheckedAlternateMed = true;
  document.getElementById('divAlternateMedicineWithoutPrice').style.display = 'none';
  document.getElementById('divAlternateMedicineWithPrice').style.display = 'block';
  var data = {
    FolderName: val
    };
  this.service.GetSpecificMedicineDetails(data).subscribe((res: MedicineInfo) => {
        //console.log(res);
          this.SelectedMedicineID = res.ProductID;
          this.SelectedMedicineName = res.ProductName;
          this.SelectedMedicineCategory = res.Category;
          this.SelectedMedicineGeneric = res.Generic;
          this.SelectedMedicineManufacturar = res.Manufacturer;
          this.SelectedMedicineStrength = res.Strength;
          this.CurrentGenericID = res.GenericID;
          this.SelectedMedicinePrice = res.Price;
          this.reloadMedicineListForSorting();
        });
};

addToFavourite(productId,centerId,doctorId,testId,remarks){
var data = {
  PrescriptionID: this.route.snapshot.paramMap.get('rxid'),
  ProductID: productId,
  CenterID: centerId,
  DoctorID: doctorId,
  TestID: testId,
  Remarks: remarks
  };

this.service.AddToFavourites(data).subscribe(data => {
  this.showpricecomparisonmedicine('N');
  this.loadmyfavourites();
  //this.ngOnInit();
});
};

getCenterByKeyword(){
  var keyowrd = $('#SearchKeyword').val();
  //this.selectedCenterForComparison = [];
  this.selectedCenterForComparison.data = [DiagonosticTestCenter];
  //this.selectedCenterForComparison.filter(x => x.CenterID !== null)
  var data = {
    FolderName: keyowrd
    };
  
  this.service.GetTestCenterByKeyword(data).subscribe(res => {
    this.filteredDiagonosticTestCenterList = res;
  });
};

selectCenter(isSelected,centerId, centerName){
if(isSelected){
  this.selectedCenterForComparison.push(
    {
      CenterID: centerId,
      CenterName: centerName
    }
  );
} else{
  this.selectedCenterForComparison = this.selectedCenterForComparison.filter(item => item.CenterID != centerId);
}
if(Object.keys(this.selectedCenterForComparison).length > 1){
  this.IsComparePossible = true;
} else{
  this.IsComparePossible = false;
}
};

compareLab(){
  $('#divComparisonModal').show();
  $('#divSelectionModal').hide();
  var centers = Array.prototype.map.call(this.selectedCenterForComparison, function(item) { return item.CenterID; }).join(",");
  centers = centers.substring(1);
  if(centers.length > 28){
    alert("You can compare between maximum 3 Centers.")
    return;
  }
  var data = {
    FolderID: this.route.snapshot.paramMap.get('rxid'),
    FolderName: centers
    };
  
  this.service.GetLabComparisonOverall(data).subscribe(res => {
    this.labComparisonOverall = res;
  });

  this.service.GetLabComparisonTest(data).subscribe(res => {
    const statesSeen = {};

    this.labComparisonTest = res.sort((a, b) => {
      const stateComp = a.TestName.localeCompare(b.TestName);
      return stateComp;
    }).map(x => {
      const stateSpan = statesSeen[x.TestName] ? 0 :
        res.filter(y => y.TestName === x.TestName).length;

      statesSeen[x.TestName] = true;

      return { ...x, stateSpan };
    });
  });

  this.service.GetAllLabComparisonTest(data).subscribe(res => {
    const statesSeen = {};

    this.labComparisonTestSummary = res.sort((a, b) => {
      const stateComp = a.TestName.localeCompare(b.TestName);
      return stateComp;
    }).map(x => {
      const stateSpan = statesSeen[x.TestName] ? 0 :
        res.filter(y => y.TestName === x.TestName).length;

      statesSeen[x.TestName] = true;

      return { ...x, stateSpan };
    });
  });

};

returnToCompareLab(){
  $('#divComparisonModal').hide();
  $('#divSelectionModal').show();
};

onVitalChange(vital){
  //var vital = $('#VitalID').val();
  this.specificVital = this.allVitals.filter(t=>t.VitalID ===vital)[0];
};

addNewVital(vital){
  var reading = $('#VitalReadingModal').val();
  var data = {
    PrescriptionID: this.route.snapshot.paramMap.get('rxid'),
    VitalID: vital,
    Reading: reading,
    MeasurementUnit: this.specificVital.MeasurementUnit
    };
  
  this.service.AddVitals(data).subscribe(data => {
    this.loadVitals();
    document.getElementById("BtnCloseAddVitalsModal").click();
    //this.ngOnInit();
  });
};

loadSpecificVital(vitalId,reading,unit){
  document.getElementById("Btnaddvitals").click();
  this.vitalselection = vitalId;
  $('#VitalReadingModal').val(reading);
  this.specificVital.MeasurementUnit = unit;
};

deleteVitals(vitalId){
  var data = {
    FolderName: this.route.snapshot.paramMap.get('rxid'),
    Description: vitalId
    };

    this.service.DeleteVital(data).subscribe((res: any) => {
      this.loadVitals();
    });
};

changeTimeType(event){
  if(event.target.value == "Waiting"){
    $('#divWaiting').show();
    $('#divConsulting').hide();
  } else{
    $('#divWaiting').hide();
    $('#divConsulting').show();
  };
};

changeCostType(event){
  if(event.target.value == "Transport"){
    $('#divTransport').show();
    $('#divVisit').hide();
  } else{
    $('#divTransport').hide();
    $('#divVisit').show();
  };
};

onClickReport(){
  var screen = $('#ScreenReport').val();
  var report = $('#txtReport').val();
  if(!report){
    alert("Please state the problem you have faced.");
    return;
  }
  var data = {
    PrescriptionID: this.route.snapshot.paramMap.get('rxid'),
    Screen: 'SmartRx',
    ReportText: report
    };
  
  this.service.CreateBugReport(data).subscribe(data => {
    document.getElementById("BtnCloseReportModal").click();
    alert("Thank you for your valuable feedback. We will resolve the issue ASAP.");
    $('#txtReport').val('');
  });
};

encryptData(msg) {
  var encryptSecretKey = "smartRx"; //adding secret key
  var keySize = 256;
  var salt = CryptoJS.lib.WordArray.random(16);
  var key = CryptoJS.PBKDF2(encryptSecretKey, salt, {
      keySize: keySize / 32,
      iterations: 100
  });
  
  var iv = CryptoJS.lib.WordArray.random(128 / 8);
  
  var encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
  });
  
  var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
  
  return result;
}

}

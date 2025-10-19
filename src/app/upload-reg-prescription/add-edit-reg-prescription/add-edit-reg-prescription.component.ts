import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserWiseFolder } from 'src/app/models/userWiseFolder.model';
import { UserWiseFile } from 'src/app/models/userWiseFile.model';
import { SharedService } from 'src/app/shared.service'
import { Message } from '../../models/message.model';
import { AlertService } from '../../alert.service';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Tag } from 'src/app/models/Tag.model';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SmartRxMaster } from 'src/app/models/smartRxMaster.model';
import { SmartRXMedicineDetails } from 'src/app/models/smartRXMedicineDetails.model';
import { SmartRXInvestigationDetails } from 'src/app/models/smartRXInvestigationDetails.model';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { fromPath } from "pdf2pic";
import * as CryptoJS from 'crypto-js'; 


@Component({
  selector: 'app-add-edit-reg-prescription',
  templateUrl: './add-edit-reg-prescription.component.html',
  styleUrls: ['./add-edit-reg-prescription.component.css']
})
export class AddEditRegPrescriptionComponent implements OnDestroy, OnInit {

  constructor(private service: SharedService, private alertService: AlertService, private router: Router, private imageCompress: NgxImageCompressService) {

  }

  //dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();



  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  folderList: any = [UserWiseFolder];
  fileList: any = [UserWiseFile];
  directfileList: any = [UserWiseFile];
  allFileList: any = [UserWiseFile];
  SmartRXInvestigationDetailsList: any = [SmartRXInvestigationDetails];
  SmartRXMedicineDetailsList: any = [SmartRXMedicineDetails];
  FolderName: string;
  Description: string;
  Caption: string;
  PhotoFileName: string;
  PhotoFilePath: string;
  UniqueFileId: string;
  UniqueFileName: string;
  IsUploadFileButtonVisible = false;
  IsFolderDeleteButtonVisible = false;
  IsUploadFileDivVisible: boolean = false;
  IsFileListTableVisible: boolean = false;
  IsDirectFileAvailable: boolean = false;
  IsOldViewAvailable: boolean = false;
  mobile: boolean = false;
  IsUploadFileFromDisk = true;
  IsRegularView = true;
  IsSmartView = false;
  IsTag1 = true;
  IsTag2 = false;
  IsTag3 = false;
  IsTag4 = false;
  IsTag5 = false;
  Ratio = 100;
  Quality = 100;
  IsUploadPossible = false;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  UserFolder: UserWiseFolder = new UserWiseFolder();
  SmartRxMasterInfo: SmartRxMaster = new SmartRxMaster();

  EditFolderId: string = "";
  EditFolderName: string = "";
  EditFolderDescription: string = "";
  MovableFileName: string = "";
  DestinationFolderId = "";
  Tag1: string = "";
  Tag2: string = "";
  Tag3: string = "";
  Tag4: string = "";
  Tag5: string = "";
  TaggedFileName = "";
  SharedImageFilePath = "";

  localUrl: any;
  localCompressedURl: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;

  compressedImageFile: any;

  MailTo: string = "";
  MailSubject: string = "";
  MailBody: string = "";
  AttachedFileName: string = "";

  @ViewChild('closeModal') private closeModal: ElementRef;
  @ViewChild('closeModalMove') private closeModalMove: ElementRef;
  @ViewChild('closeModalTag') private closeModalTag: ElementRef;
  @ViewChild('myInput') private myInputVariable: ElementRef;

  name = 'ngx sharebuttons';

  ngOnInit(): void {
    var val = (localStorage.getItem("UserID") == null ? "" : localStorage.getItem("UserID").toString());
    console.log(val);
    if (!val) {
      alert("Please Login/Signup to browse your uploads.");
      this.router.navigate(['/', 'login']);
      return;
    }
    this.getUserFolders();
    this.getDirectFileList();
    this.PhotoFilePath = this.service.PhotoUrl + '/' + "no_image.jpg";

    if (window.screen.width < 430) { // 768px portrait
      this.mobile = true;
    }

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 2
    // };
    this.onViewAllFilesClick();

  }

  getUserFolders() {
    var val = {
      userId: localStorage.getItem("UserID").toString()
    };
    //var val = localStorage.getItem("UserID").toString();
    //alert(val);
    this.folderList = [UserWiseFolder];
    this.fileList = [UserWiseFile];
    this.service.getUserFolderList(val).subscribe(data => {
      this.folderList = data;
      //console.log(this.folderList);
    });
  }

  getUserFoldersForSmartRX() {
    var val = {
      userId: localStorage.getItem("UserID").toString()
    };
    //var val = localStorage.getItem("UserID").toString();
    //alert(val);
    this.folderList = [UserWiseFolder];
    this.fileList = [UserWiseFile];
    this.service.getUserFolderListForSmartRX(val).subscribe(data => {
      this.folderList = data;
      //console.log(this.folderList);
    });
  }

  addFolderClick() {
    var val = {
      FolderName: this.FolderName,
      Description: this.Description,
      UserId: localStorage.getItem("UserID").toString()
    }
    this.service.addUserFolder(val).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        //this.alertService.success(res.CurrentMessage.toString());
        document.getElementById("BtnCloseAddFolderModal").click();
        this.getUserFolders();
      }
      else {
        this.alertService.error(res.CurrentMessage.toString());
      }
    });
  }

  closeClick() {
    this.getUserFolders();
  }

  getDirectFileList() {
    var data = {
      UserID: localStorage.getItem("UserID").toString(),
      FolderID: 0
    };

    this.directfileList = [UserWiseFile];
    this.IsDirectFileAvailable = false;

    //alert(this.allFileList[0].FolderID);
    if(this.allFileList){
      this.directfileList = this.allFileList.filter(x => x.FolderID == 0);
    } else{
      this.directfileList = "";
    }

    if(this.directfileList.length == 0){
      this.service.getUserFileList(data).subscribe(data => {
          this.directfileList = data;
          //console.log(this.folderList);
        });
    }

    if(this.directfileList){
      this.IsDirectFileAvailable = true;
    }
  }

  onFolderClick(val: any) {
    //console.log(val);    
    this.UserFolder = val;
    this.Caption = this.UserFolder.FolderName + "'s Rx";
    var data = {
      UserID: localStorage.getItem("UserID").toString(),
      FolderID: this.UserFolder.FolderID
    };
    //var val = localStorage.getItem("UserID").toString();
    //alert(val);
    this.fileList = [UserWiseFile];
    this.IsFileListTableVisible = false;
    //alert(this.allFileList[0].FolderID);
    if(this.allFileList){
      this.fileList = this.allFileList.filter(x => x.FolderID == this.UserFolder.FolderID);
    } else{
      this.fileList = "";
    }
    //alert(this.fileList.length);
    if(this.fileList.length == 0){
      this.service.getUserFileList(data).subscribe(data => {
          this.fileList = data;
          //console.log(this.folderList);
        });
    }
        /* this.service.getUserFileList(data).subscribe(data => {
          this.fileList = data;
          //console.log(this.folderList);
        }); */
    this.IsUploadFileButtonVisible = true;
    this.IsFolderDeleteButtonVisible = true;
    this.IsUploadFileDivVisible = false;
    if(this.fileList){
      this.IsFileListTableVisible = true;
    }
  }

  onFolderClickForSmartRX(val: any) {
    //console.log(val);    
    this.UserFolder = val;
    var data = {
      UserID: localStorage.getItem("UserID").toString(),
      FolderID: this.UserFolder.FolderID
    };
    //var val = localStorage.getItem("UserID").toString();
    //alert();
    this.fileList = [UserWiseFile];
    this.IsFileListTableVisible = false;
    this.service.getUserFileListForSmartRX(data).subscribe(data => {
      this.fileList = data;
      //console.log(this.folderList);
    });

    this.IsFileListTableVisible = true;
  }

  uploadPhoto(event) {
    //debugger;
    var file = event.target.files[0];
    //console.log(file);
    //console.log('size before', file.size);
    //console.log('type', file.type);

    if (!this.validateFile(file.name)) {
      this.alertService.error("Selected file format is not supported");
      this.myInputVariable.nativeElement.value = "";
      return false;
    }
    this.IsUploadPossible = true;
    var orientation = -1;
    //alert(file.height());
    //alert(file.width());
    /* if (file.size > 1000000){
      this.Ratio = 50;
      this.Quality = 50;
    } else if (file.size > 500000){
      this.Ratio = 70;
      this.Quality = 70;
    } else if (file.size > 100000){
      this.Ratio = 80;
      this.Quality = 80;
    } */

    var ext = file.name.substring(file.name.lastIndexOf('.') + 1);

    if (ext.toLowerCase() != 'pdf') {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.localUrl = event.target.result;
          const img = new Image();
        img.src = reader.result as string;
        img.onload = () => {

          if(img.naturalHeight>3000){
            this.Ratio=50;
            this.Quality=50;
          }else if(img.naturalHeight>2000){
            this.Ratio=70;
            this.Quality=70;
          }else {
            this.Ratio=100;
            this.Quality=100;
          }

          //const width = img.naturalWidth;
          this.imageCompress.compressFile(this.localUrl, orientation, this.Ratio, this.Quality).then(
            result => {
              var val = {
                FolderName: result
              }
              //this.imageCompress.byteCount(image)/(1024*1024);
              this.service.uploadRegisteredUserFileFromDisk(val).subscribe((data: any) => {
                this.PhotoFileName = data.FileName.toString();
                this.UniqueFileId = data.UniqueFileId.toString();
                this.UniqueFileName = data.UniqueFileName.toString();
                this.PhotoFilePath = this.service.PhotoUrl + '/' + this.UniqueFileName;
              });
            });

        };

          
        }
        reader.readAsDataURL(event.target.files[0]);
      }
    }
    else {
      //save pdf
      /* if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.localUrl = event.target.result;
          const img = new Image();
        img.src = reader.result as string;

        alert(img.src)

        };
      }; */
    }

  }

  uploadPrescription() {
    if (!this.UniqueFileId) {
      this.alertService.error("Please select file to upload.");
      return;
    }

    if(!this.UserFolder.FolderID){
      this.UserFolder.FolderID  = 0;
    }

    var val = {
      PrescriptionID: 0,
      Caption: this.Caption,
      FolderID: this.UserFolder.FolderID,
      UploadedFileName: this.PhotoFileName,
      UniqueFileId: this.UniqueFileId,
      UniqueFileName: this.UniqueFileName,
      UserID: localStorage.getItem("UserID").toString(),
      Tag1: this.Tag1,
      Tag2: this.Tag2,
      Tag3: this.Tag3,
      Tag4: this.Tag4,
      Tag5: this.Tag5
    };
    this.service.addRegisteredUserPrescription(val).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        //this.alertService.success(res.CurrentMessage.toString());
        this.IsUploadPossible = false;
        var data = {
          UserID: localStorage.getItem("UserID").toString(),
          FolderID: this.UserFolder.FolderID
        };
        this.service.getUserFileList(data).subscribe(data => {
          this.fileList = data;
        });
        this.IsUploadFileDivVisible = false;
        this.IsFileListTableVisible = true;
        this.clearForm();
      }
      else {
        this.alertService.error(res.CurrentMessage.toString());
      }
    });
  }

  showUploadFileDiv() {
    this.IsUploadFileDivVisible = true;
    this.IsFileListTableVisible = false;
  }

  public downloadFile(val: any) {
    this.service.downloadUploadedFile(val).subscribe(
      (data: any) => {
        const downloadedFile = new Blob([data]);
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = val;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
      },
      error => {
        console.log("no data found.");
      }
    );
  }

  public getFolderWiseFileList() {
    if(!this.UserFolder.FolderID){
      this.UserFolder.FolderID = 0;
    }
    var data = {
      UserID: localStorage.getItem("UserID").toString(),
      FolderID: this.UserFolder.FolderID
    };
    this.service.getUserFileList(data).subscribe(data => {
      this.fileList = data;
    });
  }

  public deleteFile(val: any) {
    if (confirm("Are you sure to remove this file?")) {
      this.service.deleteFile(val).subscribe((res: Message) => {
        if (res.MessageType == 1) {
          //this.alertService.success("File has been successfully removed from archive.");
          this.getFolderWiseFileList();
        }
      });
    }
  }

  public requestForSmartRx(val: any) {
    this.service.updateSmartRxRequest(val).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        alert("Request for Smart Rx has been submitted. We will create your Smart Rx within 24 hours.");
      }
    });
  }

  public deleteFolder(val: any) {
    if(val){
      this.UserFolder = val;
    }
    if (confirm("Removing this folder will also delete files in it, Do you want to proceed?")) {
      var folderId = this.UserFolder.FolderID;
      this.service.deleteFolder(folderId).subscribe((res: Message) => {
        if (res.MessageType == 1) {
          //this.alertService.success(res.CurrentMessage);
          this.getUserFolders();
          this.getFolderWiseFileList();
        }
      });
    }
  }

  onEditFolderClick(val: any) {
    console.log(val);
    this.EditFolderId = val.FolderID;
    this.EditFolderName = val.FolderName;
    this.EditFolderDescription = val.Description;
  }

  onEditClick() {
    var val = {
      FolderID: this.EditFolderId,
      FolderName: this.EditFolderName,
      Description: this.EditFolderDescription,
      UserId: localStorage.getItem("UserID").toString()
    }
    this.service.editUserFolder(val).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        //this.alertService.success(res.CurrentMessage.toString());
        this.closeModal.nativeElement.click();
      }
      else {
        this.alertService.error(res.CurrentMessage.toString());
      }
    });
  }

  moveFile(val: any) {
    this.MovableFileName = val;
  }

  onMoveFolderClick() {
    var val = {
      UniqueFileName: this.MovableFileName,
      FolderID: this.DestinationFolderId
    };
    console.log(val);
    this.service.moveFileAcrossFolder(val).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        //this.alertService.success(res.CurrentMessage.toString());
        this.getUserFolders();
        this.getFolderWiseFileList();
        this.closeModalMove.nativeElement.click();
      }
      else {
        this.alertService.error(res.CurrentMessage.toString());
      }
    });
  }

  onViewAllFilesClick() {
    var data = {
      UserID: localStorage.getItem("UserID").toString()
    };

    this.service.getUserAllFileList(data).subscribe(data => {
      this.allFileList = [UserWiseFile];
      this.allFileList = data;
      this.dtTrigger.next();
    });
  }

  loadTag(val: any) {
    this.clearTag();
    this.TaggedFileName = val;
    this.service.loadTag(val).subscribe((res: Tag) => {
      this.Tag1 = res.Tag1;
      this.Tag2 = res.Tag2;
      this.Tag3 = res.Tag3;
      this.Tag4 = res.Tag4;
      this.Tag5 = res.Tag5;

      if (this.Tag2) {
        this.IsTag2 = true;
      }
      if (this.Tag3) {
        this.IsTag3 = true;
      }
      if (this.Tag4) {
        this.IsTag4 = true;
      }
      if (this.Tag5) {
        this.IsTag5 = true;
      }

    });
  }

  onTagDoneClick() {
    var data = {
      UniqueFileName: this.TaggedFileName,
      Tag1: this.Tag1,
      Tag2: this.Tag2,
      Tag3: this.Tag3,
      Tag4: this.Tag4,
      Tag5: this.Tag5
    };
    this.service.insertTag(data).subscribe(data => {
      //this.allFileList = data;
    });
    this.clearTag();
    document.getElementById("BtnCloseTagModal").click();
  }

  onAddMore() {
    if (this.IsTag2) {
      if (this.IsTag3) {
        if (this.IsTag4) {
          this.IsTag5 = true;
        } else {
          this.IsTag4 = true;
        }
      } else {
        this.IsTag3 = true;
      }
    } else {
      this.IsTag2 = true;
    }
  }

  onRemoveTag() {
    if (this.IsTag5) {
      this.IsTag5 = false
    } else {
      if (this.IsTag4) {
        this.IsTag4 = false
      } else {
        if (this.IsTag3) {
          this.IsTag3 = false
        } else {
          if (this.IsTag2) {
            this.IsTag2 = false
          } else {

          }
        }
      }
    }
  }

  onImageClick(val: any) {
    //alert(val);
    this.SharedImageFilePath = val;
    document.getElementById("BtnCloseViewModal").click();
    //alert(val);
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpg' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'pdf') {
      return true;
    }
    else {
      return false;
    }
  }

  viewSmartRx(val: any) {
    alert(val);
    var data = {
      FolderName: this.encryptData(val)
    };
    this.service.GetSmartRXMaster(data).subscribe((res: SmartRxMaster) => {
      this.SmartRxMasterInfo = res;
    });
    this.service.GetSmartRXMedicineDetails(data).subscribe((res: any) => {
      this.SmartRXMedicineDetailsList = res;
      //$('#labTable tr:last').after('<tr><td>Rx.</td></tr>');
      $("#medicineTable tr").remove();
      $('#medicineTable').append('<tr><td>Rx.</td></tr>');
      for (var i = 0; i < res.length; i++) {
        $('#medicineTable tr:last').after('<tr><td>' + res[i].MedicinName + '</td></tr><tr><td>' + res[i].Frequency + ' ' + res[i].Duration + ' ' + res[i].Notes + '</td></tr>');
      }
    });
    this.service.GetSmartRXInvestigationDetails(data).subscribe((res: any) => {
      this.SmartRXInvestigationDetailsList = res;
      //$('#labTable').DataTable();
      $("#labTable tr").remove();
      $('#labTable').append('<tr><td>Investigation</td></tr>');
      for (var i = 0; i < res.length; i++) {
        $('#labTable tr:last').after('<tr><td>' + res[i].Investigation + '</td></tr>');
      }
    });
  }

  print() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 194;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 5;
      pdf.addImage(contentDataURL, 'PNG', 8, position, imgWidth, imgHeight)
      pdf.save('SmartRx.pdf'); // Generated PDF 
      this.closeModalTag.nativeElement.click();
    });
  }

  mailBtnClick(val: any) {
    this.AttachedFileName = val;
  }

  sendMail() {
    var data = {
      MailTo: this.MailTo,
      MailSubject: this.MailSubject,
      MailBody: this.MailBody,
      AttachedFileName: this.AttachedFileName
    }
    this.service.SendMail(data).subscribe((res: Message) => {
      //this.closeModalTag.nativeElement.click();
      document.getElementById("BtnCloseEmailModal").click();
    });
  }

  onOptionsSelected(val: string) {
    this.IsFileListTableVisible = false;
    if (val == "02") {
      this.IsRegularView = false;
      this.IsSmartView = true;
      this.getUserFoldersForSmartRX();

    } else {
      this.IsRegularView = true;
      this.IsSmartView = false;
      this.getUserFolders();
    }
  }

  clearForm() {
    this.Caption = "";
    this.PhotoFileName = "";
    this.PhotoFilePath = "";
    this.UniqueFileId = "";
    this.UniqueFileName = "";
    this.PhotoFilePath = this.service.PhotoUrl + '/' + "no_image.jpg";
    this.IsUploadFileFromDisk = true;
    this.showWebcam = false;
    this.mobile = false;
    this.webcamImage = null;
  }

  clearTag() {
    this.TaggedFileName = "";
    this.Tag1 = "";
    this.Tag2 = "";
    this.Tag3 = "";
    this.Tag4 = "";
    this.Tag5 = "";
  }


  public triggerSnapshot(): void {
    this.IsUploadFileFromDisk = false;
    this.showWebcam = true;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.uploadCameraPhoto(this.webcamImage);
    this.IsUploadPossible = true;
  }

  uploadCameraPhoto(camImage: WebcamImage) {
    //alert("Upload");
    //const downloadedFile = new Blob([camImage.imageAsDataUrl]);
    //console.log(camImage.imageAsDataUrl);
    //var file = camImage; //event.target.files[0];
    //var f = new File([camImage.imageAsDataUrl], "CaptureImage.jpg", { type: "image/jpeg" });

    //const formData: FormData = new FormData();
    //formData.append('uploadedFile', f, "CaptureImage.jpg");
    var val = {
      FolderName: camImage.imageAsDataUrl
    }

    this.service.uploadRegisteredUserFileFromCamera(val).subscribe((data: any) => {
      this.PhotoFileName = data.FileName.toString();
      this.UniqueFileId = data.UniqueFileId.toString();
      this.UniqueFileName = data.UniqueFileName.toString();
      this.PhotoFilePath = this.service.PhotoUrl + '/' + this.UniqueFileName;
    });
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  onClickReport(){
    var screen = $('#ScreenReport').val();
    var report = $('#txtReport').val();
    if(!report){
      alert("Please state the problem you have faced.");
      return;
    }
    var data = {
      Screen: 'RxUpload',
      ReportText: report
      };
    
    this.service.CreateBugReport(data).subscribe(data => {
      document.getElementById("BtnCloseReportModal").click();
      //alert("Bug Report Submitted.");
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

  localencryption(msg) {
    var encryptSecretKey = "smartRx"; //adding secret key
    var keySize = 256;
    var salt = CryptoJS.lib.WordArray.random(16);
    var key = CryptoJS.PBKDF2(encryptSecretKey, salt, {
        keySize: keySize / 32,
        iterations: 100
    });
    
    var iv = CryptoJS.lib.WordArray.random(128 / 8);
    
    var encrypted = CryptoJS.AES.encrypt(msg, encryptSecretKey).toString();
    
    return encrypted;
  }

}

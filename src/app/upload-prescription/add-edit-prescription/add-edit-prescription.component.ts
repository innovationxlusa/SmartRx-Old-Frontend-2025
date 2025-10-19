import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { LocalStrg } from 'src/app/models/localStrg.model';
import { SharedService } from 'src/app/shared.service';
import { Subject, Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { AlertService } from '../../alert.service';
import { Message } from '../../models/message.model';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SocialAuthService, SocialLoginModule } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { MessageConveyService } from '../../messageConveyService.service';
import { Users } from 'src/app/models/users.model';
import { Router } from '@angular/router'


@Component({
  selector: 'app-add-edit-prescription',
  templateUrl: './add-edit-prescription.component.html',
  styleUrls: ['./add-edit-prescription.component.css'],
  providers: [SocialLoginModule, SocialAuthService]
})
export class AddEditPrescriptionComponent implements OnInit {

  constructor(private service: SharedService, private alertService: AlertService, private imageCompress: NgxImageCompressService, private router: Router, private messageConveyService: MessageConveyService, private _http: HttpClient, 
    private _externalAuthService: SocialAuthService) { }

  @Input() prescription: any;
  PrescriptionID: string;
  MobileNo: string;
  Caption: string;
  PhotoFileName: string;
  PhotoFilePath: string;
  UniqueFileId: string;
  UniqueFileName: string;
  prescriptionList: any = [];
  localStorage: Storage;
  PendingData: string;
  myArray = [];
  IsUploadFileFromDisk = true;
  mobile: boolean = false;
  localUrl: any;
  localCompressedURl: any;
  imgResultBeforeCompress: string;
  imgResultAfterCompress: string;
 
  compressedImageFile: any;

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



  ngOnInit(): void {
    this.PhotoFilePath = this.service.PhotoUrl + '/' + "no_image.jpg";
    this.localStorage = window.localStorage;
    this.PendingData = this.getLocalStorageData();
    this.getAllLocalStorageData();

    if (window.screen.width > 360) { // 768px portrait
      this.mobile = true;
    }

    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });

  }

  uploadPrescription() {
    if (!this.UniqueFileId) {
      this.alertService.error("Please select file to upload.");
      return;
    }
    var val = {
      PrescriptionID: 0,
      MobileNo: this.MobileNo,
      Caption: this.Caption,
      UploadedFileName: this.PhotoFileName,
      UniqueFileId: this.UniqueFileId,
      UniqueFileName: this.UniqueFileName
    };
    this.service.addUnRegisteredPrescription(val).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        this.alertService.success(res.CurrentMessage.toString());
        //this.setLocalStorageValue(this.MobileNo,this.UniqueFileId);
        this.setLocalStorageValue('Uploads', this.UniqueFileId);
        this.PendingData = this.getLocalStorageData();
        this.clearForm();
      }
    });


  }

  // uploadPhoto(event) {
  //   var file = event.target.files[0];

  //   if (!this.validateFile(file[0].name)) {
  //     this.alertService.error("Selected file format is not supported");
  //     //console.log('Selected file format is not supported');
  //     return false;
  //   }
  //   const formData: FormData = new FormData();
  //   formData.append('uploadedFile', file, file.name);

  //   this.service.uploadUnRegisteredUserFileFromDisk(formData).subscribe((data: any) => {
  //     this.PhotoFileName = data.FileName.toString();
  //     //alert(this.PhotoFileName);
  //     //alert(data.UniqueFileName.toString());
  //     this.UniqueFileId = data.UniqueFileId.toString();
  //     this.UniqueFileName = data.UniqueFileName.toString();
  //     //this.PhotoFilePath=this.service.PhotoUrl+'/'+this.PhotoFileName;
  //     this.PhotoFilePath = this.service.PhotoUrl + '/' + this.UniqueFileName;
  //   });
  // }

  uploadPhoto(event) {
    //debugger;
    var file = event.target.files[0];
    //console.log(file);
    //console.log('size before', file.size);
    //console.log('type', file.type);

    if (!this.validateFile(file.name)) {
      this.alertService.error("Selected file format is not supported");      
      return false;
    }

    var orientation = -1;

    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();
      reader.onload = (event: any) => {        
        this.localUrl = event.target.result;                
        this.imageCompress.compressFile(this.localUrl, orientation, 50, 50).then(
          result => {
            var val = {
              FolderName: result
            }
        
            this.service.uploadUnRegisteredUserFileFromDisk(val).subscribe((data: any) => {
              this.PhotoFileName = data.FileName.toString();
              this.UniqueFileId = data.UniqueFileId.toString();
              this.UniqueFileName = data.UniqueFileName.toString();
              this.PhotoFilePath = this.service.PhotoUrl + '/' + this.UniqueFileName;
            });
          });
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  setLocalStorageValue(key: string, value: any): boolean {
    if (this.isLocalStorageSupported) {
      var localStorageValue = JSON.stringify(this.localStorage.getItem("Uploads"));
      if (localStorageValue !== null) {
        this.myArray.push(JSON.parse(localStorage.getItem('Uploads')));
        var data = {
          //[value]: value
          'FileID':value
        }
        this.myArray.push(data);
        localStorage.setItem('Uploads', JSON.stringify(this.myArray));
        console.log(localStorage.getItem('Uploads'));
      }
      return true;
    }
    return false;
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

  getAllLocalStorageData() {
    Object.keys(localStorage).forEach(data => {
      let item = localStorage.getItem(data);
      console.log(item); // item is the item from storage.
    });
  }
  getLocalStorageData() {
    if (this.getLocalStorageValue("Uploads") !== null)
      this.PendingData = ((Object.keys(this.getLocalStorageValue("Uploads")).length) - 1).toString();
    else
      this.PendingData = "0";
    return this.PendingData;
    //console.log("Pending :"+this.PendingData);          
    //alert(Object.keys(this.PendingData).length);
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

  onGoogleSignUp () {
  this.signIn().then(data => {
    /* data.id = this.googleUserModel.id;
    data.name = this.googleUserModel.name;
    data.email = this.googleUserModel.email; */
    this.service.googleSignUp(data).subscribe((res: Message) => {
      if (res.MessageType == 1) {
        //console.log(res);
        this.service.getGoogleUserInfo(data).subscribe((res: Users) => {
          localStorage.setItem("UserFullName", res.UserFullName);
          localStorage.setItem("UserID", res.UserID.toString());
          localStorage.setItem("Gender", res.Gender);
          this.setConveyMessage(res);
        });        
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

  setConveyMessage(res: any) {
    let message = res;
    this.messageConveyService.setMessage(message);
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

    this.service.uploadUnRegisteredUserFileFromCamera(val).subscribe((data: any) => {
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


}

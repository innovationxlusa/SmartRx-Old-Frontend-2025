import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { Message } from './models/message.model';
import { Users } from './models/users.model';
import { Tag } from './models/Tag.model';
import{SmartRxMaster} from './models/smartRxMaster.model';
// import{SmartRXMedicineDetails} from './models/SmartRXMedicineDetails.model';
import{SmartRXInvestigationDetails} from './models/smartRXInvestigationDetails.model';
import { GoogleUsers } from './models/googleUsers.model';
import { UserProfile } from './models/UserProfile.model';
import { MedicineInfo } from './models/medicineInfo.model';
import { RxSummary } from './models/rxsummary.model';
import { ActivityReward } from './models/activityReward.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:5000/api";
  //readonly PhotoUrl = "http://localhost:5000/Photos";

  //readonly APIUrl = "http://innovationxl-001-site2.gtempurl.com/api";
  readonly PhotoUrl = "http://innovationxl-001-site2.gtempurl.com/Photos"; 
  

  constructor(private http: HttpClient) { }

  // Methods for API Subscriber for Registered User
  getPrescriptionList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/PrescriptionInfo');
  }

  addRegisteredPrescription(val: any) {
    return this.http.post(this.APIUrl + '/PrescriptionInfo', val);
  }

  updateRegisteredPrescription(val: any) {
    return this.http.put(this.APIUrl + '/PrescriptionInfo', val);
  }

  deleteRegisteredPrescription(val: any) {
    return this.http.delete(this.APIUrl + '/PrescriptionInfo' + val);
  }

  uploadRegisteredFile(val: any) {
    return this.http.post(this.APIUrl + '/PrescriptionInfo/SaveFile', val);
  }


  // Methods for API Subscriber for Un-Registered User
  addUnRegisteredPrescription(val: any) {
    return this.http.post(this.APIUrl + '/UnregisteredUserPrescriptionInfo', val);
  }

  // uploadUnRegisteredFile(val: any) {
  //   return this.http.post(this.APIUrl + '/UnregisteredUserPrescriptionInfo/SaveFile', val);
  // }

  uploadUnRegisteredUserFileFromDisk(val: any) {
    return this.http.post(this.APIUrl + '/UnregisteredUserPrescriptionInfo/SaveFileFromDisk', val);
  }
  uploadUnRegisteredUserFileFromCamera(val: any) {
    return this.http.post(this.APIUrl + '/UnregisteredUserPrescriptionInfo/SaveFileFromCamera', val);
  }

  //Methods for API subscriber for User SignUp
  userSignUp(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserSignUp', val);
  }

  submitOTP(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserSignUp/ValidateOTP', val);
  }

  SaveUnregisteredUserDataFromStorage(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserSignUp/SaveUnregisteredUserDataFromStorage', val);
  }

  //Methods for API subscriber for User Login
  login(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserLogin', val);
  }
  
  getUserInfo(val: any) {
    return this.http.post<Users>(this.APIUrl + '/UserLogin/GetUserInfo', val);
  }

  getProfileDetails(userId: string) {
    //return this.http.post<Users>(this.APIUrl + '/UserLogin/GetProfileDetails', userId);
    return this.http.post(`${this.APIUrl + '/UserLogin/GetProfileDetails'}?userId=${userId}`, { responseType: UserProfile })
  }

  updateProfile(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserSignUp/UpdateProfile', val);
  }

  showRewardPointList(userId: string) {
    return this.http.post(`${this.APIUrl + '/UserLogin/GetActivityRewards'}?userId=${userId}`, { responseType: ActivityReward })
  }

  getGoogleUserInfo(val: any) {
    return this.http.post<Users>(this.APIUrl + '/UserLogin/GetGoogleUser', val);
  }

  googleLogin(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserLogin/DoLoginForGoogleUser', val);
  }

  updatePassword(val: any) {
    return this.http.post(this.APIUrl + '/UserLogin/UpdatePassword', val);
  }

  //Methods for API subscriber for Registered user Prescription upload  
  getUserFolderList(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetUserFolderList', val);
  }

  getUserFolderListForSmartRX(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetUserFolderListForSmartRX', val);
  }

  addUserFolder(val: any) {
    return this.http.post<Message>(this.APIUrl + '/RegisteredUserPrescription/AddUserFolder', val);
  }

  editUserFolder(val: any) {
    return this.http.post<Message>(this.APIUrl + '/RegisteredUserPrescription/EditUserFolder', val);
  }

  uploadRegisteredUserFileFromDisk(val: any) {
    return this.http.post(this.APIUrl + '/RegisteredUserPrescription/SaveFileFromDisk', val);
  }
  uploadRegisteredUserFileFromCamera(val: any) {
    return this.http.post(this.APIUrl + '/RegisteredUserPrescription/SaveFileFromCamera', val);
  }

  addRegisteredUserPrescription(val: any) {
    return this.http.post(this.APIUrl + '/RegisteredUserPrescription', val);
  }

  getUserFileList(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetUserFileList', val);
  }

  getUserFileListForSmartRX(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetUserFileListForSmartRX', val);
  }

  public downloadUploadedFile(file: string): Observable<Blob> {
    return this.http.get(`${this.APIUrl + '/RegisteredUserPrescription/DownloadFile'}?file=${file}`, { responseType: 'blob' })
  }

  deleteFile(fileName: string) {
    return this.http.post(`${this.APIUrl + '/RegisteredUserPrescription/DeleteFile'}?fileName=${fileName}`, { responseType: Message })
  }

  updateSmartRxRequest(prescriptionId: string) {
    return this.http.post(`${this.APIUrl + '/RegisteredUserPrescription/UpdateSmartRxRequest'}?prescriptionId=${prescriptionId}`, { responseType: Message })
  }

  deleteFolder(folderId: number) {
    return this.http.post(`${this.APIUrl + '/RegisteredUserPrescription/DeleteFolder'}?folderId=${folderId}`, { responseType: Message })
  }

  moveFileAcrossFolder(val: any) {
    return this.http.post<Message>(this.APIUrl + '/RegisteredUserPrescription/MoveFileAcrossFolder', val);
  }

  getUserAllFileList(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetUserAllFileList', val);
  }

  loadTag(fileName: string) {
    return this.http.post(`${this.APIUrl + '/RegisteredUserPrescription/LoadTag'}?fileName=${fileName}`, { responseType: Tag })
  }

  insertTag(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/InsertTag', val);
  }

  GetSmartRXMaster(val: any) {
    return this.http.post<SmartRxMaster>(this.APIUrl + '/RegisteredUserPrescription/GetSmartRXMaster', val);
  }

  GetRxSummary(val: any) {
    return this.http.post<RxSummary>(this.APIUrl + '/SmartRx/GetRxSummary', val);
  }

  UpdateUserInput(val: any) {
    return this.http.post<RxSummary>(this.APIUrl + '/SmartRx/UpdateUserInput', val);
  }

  GetSmartRXMedicineDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetSmartRXMedicineDetails', val);
  }

  GetSmartRXMedicineDetailsWithPrice(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetSmartRXMedicineDetailsWithPrice', val);
  }

  GetSmartRXVitals(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetSmartRXVitals', val);
  }

  GetMedicineQuantity(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMedicineQuantity', val);
  }

  GetSmartRxChart(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetSmartRxChart', val);
  }

  GetSmartRXInvestigationDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/RegisteredUserPrescription/GetSmartRXInvestigationDetails', val);
  }

  GetSmartRXInvestigationDetailsWithPrice(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetSmartRXInvestigationDetailsWithPrice', val);
  }

  GetCenterDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetCenterDetails', val);
  }

  CreateBugReport(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/CreateBugReport', val);
  }

  GetMyDoctors(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMyDoctors', val);
  }

  GetMyVisitsByDoctors(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMyVisitsByDoctors', val);
  }

  GetMyVisits(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMyVisits', val);
  }

  AddToFavourites(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/AddToFavourites', val);
  }

  DeleteVital(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/DeleteVital', val);
  }

  AddVitals(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/AddVitals', val);
  }

  GetTestCenterByKeyword(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetTestCenterByKeyword', val);
  }

  GetLabComparisonOverall(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetLabComparisonOverall', val);
  }

  GetLabComparisonTest(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetLabComparisonTest', val);
  }

  GetAllLabComparisonTest(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetAllLabComparisonTest', val);
  }

  GetMedicineInfo(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMedicineInfo', val);
  }

  GetMedicineFAQ(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMedicineFAQ', val);
  }

  GetLabFAQ(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetLabFAQ', val);
  }

  GetAllTestCenter(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetAllTestCenter', val);
  }

  GetMyFavouriteMedicines(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMyFavouriteMedicines', val);
  }

  GetMyFavouriteLabs(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMyFavouriteLabs', val);
  }

  GetAllVitals(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetAllVitals', val);
  }

  GetSmartRxConfiguration(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetSmartRxConfiguration', val);
  }

  GetVitalDetails(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetVitalDetails', val);
  }

  GetSpecificMedicineDetails(val: any) {
    return this.http.post<MedicineInfo>(this.APIUrl + '/SmartRx/GetSpecificMedicineDetails', val);
  }

  GetMedicineDetailsByGeneric(val: any) {
    return this.http.post<any>(this.APIUrl + '/SmartRx/GetMedicineDetailsByGeneric', val);
  }

  googleSignUp(val: any) {
    return this.http.post<Message>(this.APIUrl + '/UserSignUp/UserSignUpForGoogleLogIn', val);
  }

  SendMail(val: any) {
    return this.http.post<Message>(this.APIUrl + '/RegisteredUserPrescription/SendMail', val);
  }

}








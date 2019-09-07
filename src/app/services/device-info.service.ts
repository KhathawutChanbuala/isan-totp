import { Injectable } from '@angular/core';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {
  public hasPermiss:boolean=false;
  constructor(private uid: Uid,private androidPermissions: AndroidPermissions) {
    //this.getPermission();
   }
  getPermission(){
    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res => {
      this.hasPermiss = res.hasPermission;
      if(res.hasPermission){
        this.hasPermiss = res.hasPermission;
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res => {
          console.log("permiss="+res.hasPermission);
          if (res.hasPermission) {
            alert("เริ่มต้นแอปพลิเคชันใหม่อีกครั้ง!! เพื่อให้สามารถเข้าถึงค่า IMEI และ UUID ได้สมบูรณ์");
            navigator['app'].exitApp();
          }
          
        }).catch(error => {
          alert("Error! "+error);
        });
      }
    }).catch(error => {
      alert("Error! "+error);
    });
    
  }
  getID_UID(type){
    //this.getPermission();
    if(type == "IMEI"){
      return this.uid.IMEI;
    }else if(type == "ICCID"){
      return this.uid.ICCID;
    }else if(type == "IMSI"){
      return this.uid.IMSI;
    }else if(type == "MAC"){
      return this.uid.MAC;
    }else if(type == "UUID"){
      return this.uid.UUID;
    }
  }
}

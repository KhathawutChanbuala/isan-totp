import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewISANOTPService } from "../services/new-isan-otp.service";
import CryptoJS from 'crypto-js';
import { DeviceInfoService } from "../services/device-info.service";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Uid } from '@ionic-native/uid/ngx';
@Component({
  selector: 'app-gen-otp',
  templateUrl: './gen-otp.page.html',
  styleUrls: ['./gen-otp.page.scss'],
})
export class GenOtpPage implements OnInit {
  accItem:any;
  max: number = 30;
  timeNow:number;
  otp:any='';

  IMEI:any;
  UUID:any;

  //secret:any ="e347e48ebc294cb251961e6d739aef13d7ff39090f0477f84e37c3b066b7ff82";
  //imei:any="861709048573756";
  //serial:any="2DR4C19118028461";
  // outputmode="mix6base40";
  // issuer="isan";

  constructor(private route: ActivatedRoute,
    private isanOtp:NewISANOTPService,
    private deviceInfoService:DeviceInfoService,
    private screenOrientation: ScreenOrientation,
    private uid: Uid, private androidPermissions: AndroidPermissions) {
      
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.accItem = JSON.parse(params.special);
        console.log(this.accItem);
      }
    });

    this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    ).then(res=>{
      if (res.hasPermission) {
        this.IMEI = this.deviceInfoService.getID_UID("IMEI");
        this.UUID = this.deviceInfoService.getID_UID("UUID");
        this.startTimer();
      }else{
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_PHONE_STATE).then(res=>{
          if (res.hasPermission) {
            alert("เริ่มต้นแอปพลิเคชันใหม่อีกครั้ง!! เพื่อให้สามารถเข้าถึงค่า IMEI และ UUID ได้สมบูรณ์");
            navigator['app'].exitApp();
          }else{
            this.otp="ไม่มีรหัสความปลอดภัย";
          }
        })
      }
    })
    //this.deviceInfoService.getPermission();
    // if (this.deviceInfoService.hasPermiss) {
    //   this.IMEI = this.deviceInfoService.getID_UID("IMEI");
    //   this.UUID = this.deviceInfoService.getID_UID("UUID");
    //   this.startTimer();
    // }else{
    //   this.otp ="ไม่รหัสความปลอดภัย";
    // }
    
  }

  startTimer(){
    var intervalVar = setInterval(function(){
      let currentTimeMillis = new Date().getTime();
      this.timeNow = Math.round((this.max-((currentTimeMillis/1000)%this.max)));
      this.otp = this.showTOP();
    }.bind(this),1000)
  }
  showTOP() {
    let new_totp:any="";

    let initialseed = CryptoJS.SHA256(this.accItem.secret + this.IMEI + this.UUID.toUpperCase());
    let key: string = initialseed.toString(CryptoJS.enc.Hex);


    
    let currentTimeMillis = new Date().getTime();
    let time = Math.floor((currentTimeMillis / 1000) / 30);
    
      let otp = this.isanOtp.generate_New_OTP(key,time);
      //console.log(otp);
      if (this.accItem.mode==="num6") {
        new_totp=this.isanOtp.output6Char_num6(otp);
      }else if (this.accItem.mode==="mix6base40") { 
        new_totp=this.isanOtp.output6Char_mix6base40(otp);
      }else if (this.accItem.mode==="th6base42") { 
        new_totp=this.isanOtp.output6Chars_th6base42(otp);
      }else if (this.accItem.mode==="th6base60") { 
        new_totp=this.isanOtp.output6Chars_th6base60(otp);
      }
    
    console.log(new_totp);
    return new_totp;

  }
  
  
  ngOnInit() {}

}

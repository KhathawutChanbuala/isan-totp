import { Component, OnInit } from '@angular/core';
import { PopoverController, AlertController, ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { DeviceInfoService } from "../services/device-info.service";
@Component({
  selector: 'app-popover-component',
  templateUrl: './popover-component.component.html',
  styleUrls: ['./popover-component.component.scss'],
})
export class PopoverComponentComponent implements OnInit {
  IMEI:any;
  UUID:any;
  constructor(public popoverController: PopoverController,
              public alertController: AlertController,
              private clipboard: Clipboard,
              public toastController: ToastController,
              public deviceInfo:DeviceInfoService) { }
  
  async presentIMEI() {
    this.deviceInfo.getPermission();
    this.IMEI =this.deviceInfo.getID_UID('IMEI');
    this.popoverController.dismiss();
    const alert = await this.alertController.create({
      header: 'IMEI',
      message: ""+this.IMEI,
      buttons: [{
        text:'Copy',
        handler:()=>{
          this.clipboard.copy(this.IMEI);
          this.presentToast('IMEI');
        }
      },
      {
        text:'Cancel',
        role: 'cancel',
        handler:()=>{
          alert.dismiss();
        }
      }
    ]
    });
    if (this.IMEI !==null) {
      await alert.present();
    }
    
  }

  async presentUUID() {
    this.deviceInfo.getPermission();
    this.UUID = this.deviceInfo.getID_UID('UUID');
    this.popoverController.dismiss();
    const alert = await this.alertController.create({
      header: 'UUID',
      message: ""+this.deviceInfo.getID_UID('UUID').toUpperCase(),
      buttons: [{
        text:'Copy',
        handler:()=>{
          this.clipboard.copy(this.UUID.toUpperCase());
          this.presentToast('UUID');
        }
      },
      {
        text:'Cancel',
        role: 'cancel',
        handler:()=>{
          alert.dismiss();
        }
      }
    ]
    });
  
    if (this.UUID !==null) {
      await alert.present();
    }
  }

  async presentToast(text:string) {
    const toast = await this.toastController.create({
      message: 'คักลอก '+text,
      duration: 2000
    });
    toast.present();
  }
  exit(){
    navigator['app'].exitApp();
  }

  ngOnInit() {}

}

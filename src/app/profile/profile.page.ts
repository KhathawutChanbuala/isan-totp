import { Component, OnInit } from '@angular/core';
import { ActionSheetController, PopoverController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { PopoverComponentComponent } from '../popover-component/popover-component.component';
import { Router, NavigationExtras} from '@angular/router';
import { ModaladduserPage } from "../modaladduser/modaladduser.page";
import { DatabaseService,Acc } from "../services/database.service";
import { BarcodeScanner,BarcodeScannerOptions } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  accounts:Acc[]=[];
  // account ={};
  barcodeScannerOptions: BarcodeScannerOptions;
  scannedData: {};
    protocol:string ='otpauth:';
    orgname :string='';
    username:string='';
    secret:string='';
    issuer:string='';
    hwlock:string='';
    outputmode:string='';
    round:string='';

  constructor(public actionSheetController: ActionSheetController,
              public popoverController: PopoverController,
              private router: Router,
              public modalController: ModalController,
              private db: DatabaseService,
              private toastController: ToastController,
              public alertController: AlertController,
              private barcodeScanner: BarcodeScanner) {
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true,
      //torchOn:true,
    }; 

  }
  ngOnInit() {
    this.db.getDatabaseState().subscribe(status=>{
      if (status) {
        this.db.getAccs().subscribe(accs =>{
          this.accounts = accs;
        })
      }
    })
  }
  

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'เพิ่มบัญชี',
      cssClass:'myActionSheet',
      buttons: [{
        text: 'สแกน QR Code',
        icon: 'qr-scanner',
        handler: () => {
          //this.router.navigateByUrl('/qrcode');
          console.log('Delete clicked');
          this.barcodeScanner.scan(this.barcodeScannerOptions).then(barcodeData =>{
            this.scannedData = barcodeData;
            console.log("URL="+this.scannedData['text']);
            if (!this.scannedData['cancelled']) {
            var uri = new URL(this.scannedData['text']);
            
              if (uri.protocol === this.protocol) {
                let pathArray = uri.pathname.split('/');
                let orguserArray = pathArray[pathArray.length-1].split(":");
                if (orguserArray[0]!=='') {
                  this.orgname = orguserArray[0].replace(' ',"");
                  this.username = orguserArray[orguserArray.length-1];
                }
                if (orguserArray[orguserArray.length-1]!=='') {
                  this.username = orguserArray[orguserArray.length-1];
                }
                if (uri.searchParams.get("secret") !=='') {
                  this.secret = uri.searchParams.get("secret");
                }else{
                  this.presentToast('ไม่สามารถเพิ่มบัญชีได้!!');
                  return ;
                }
                this.issuer = uri.searchParams.get("issuer");
                this.hwlock = uri.searchParams.get("hwlock");
                if (this.hwlock ==='') {
                  this.hwlock = "none";
                }
                this.outputmode = uri.searchParams.get("outputmode");
                if (this.outputmode === '') {
                  this.outputmode = "num6";
                }
                this.round = uri.searchParams.get("round");
                if (this.round === '') {
                  this.round = "30";
                }
  
                this.addAccount();
  
              }else{
                this.presentToast('ไม่สามารถเพิ่มบัญชีได้!!');
                return ;
              }
            }else{
              console.log("back page");
              this.router.navigateByUrl('/profile');
              return 0;
            }
            

          })
        }
      }, {
        text: 'เพิ่มบัญชีด้วยตนเอง',
        icon: 'person-add',
        handler: () => {
          this.presentModal();
          console.log('Share clicked');
        }
      }, 
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        cssClass:'myActionSheetCancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
    });
  
    await actionSheet.present();
  }
  
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponentComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
    component: ModaladduserPage,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }


async presentToast(text:string) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000
  });
  toast.present();
}

async deleteAccount(id:number){
  
  const alert = await this.alertController.create({
    header: 'คุณต้องการลบหรือไม่?',
    message: '<p>เมื่อลบบัญชีนี้ออก คุณจะไม่สามารถสร้างรหัสเพื่อเข้าระบบได้</p><p>ควรปิดการยืนยันแบบสองขั้นตอน</p>',
    buttons: [
       {
        text: 'Delete',
        cssClass: 'icon-color',
        handler: () => {
         this.db.deleteAccount(id).then(async _ => {
          const toast = await this.toastController.create({
            message: 'ลบข้อมูลสำเร็จ',
            duration: 2000
          });
          toast.present();
        });
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }
    ]
  });
  
    await alert.present();
  
}
genOtpPage(item){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      special: JSON.stringify(item)
    }
  };
  this.router.navigate(['/gen-otp'], navigationExtras);
}
addAccount(){
  for (let acc of this.accounts) {
    if (acc.secret===this.secret) {
      this.presentToast('มีบัญชีนี้อยู่แล้ว!!');
      return;
    }
  }
  this.db.addAccount(this.username,this.secret,this.orgname,this.issuer,this.outputmode,this.hwlock,this.round)
  .then(_ => {
    this.presentToast("เพิ่มบัญชีเรียบร้อย");
  });
  
}
exitApp(){
  navigator[ 'app' ].exitApp();
}

  

}

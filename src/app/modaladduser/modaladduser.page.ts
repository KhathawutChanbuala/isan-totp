import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatabaseService,Acc } from "../services/database.service";
import { Router, NavigationExtras} from '@angular/router';
@Component({
  selector: 'app-modaladduser',
  templateUrl: './modaladduser.page.html',
  styleUrls: ['./modaladduser.page.scss'],
})
export class ModaladduserPage implements OnInit {
  dataForm: any;
  accounts:Acc[]=[];
  account ={};
  todo = {
    round:''
  };
  constructor(public modalController: ModalController,
              public formBuilder: FormBuilder,
              private db: DatabaseService,
              private toastController: ToastController,
              private router: Router) { 
    this.setupForm();
  }

  dismiss(){
    this.modalController.dismiss({
      'dismissed': true,
      'dismissOnPageChange': true
    });
  }

  setupForm() {
    this.dataForm = this.formBuilder.group({
      username: ['', [, Validators.required]],
      secret: ['', [, Validators.required]],
      orgname: ['', [, Validators.required]],
      issuer: ['', [, Validators.required]],
      mode: ['num6'],
      hardlock: ['imeisn'],
       round: ['30'],
    });
  }

  insertData(){
    this.presentToast("เพิ่มบัญชีเรียบร้อย");
    this.modalController.dismiss();
    // console.log("username="+this.dataForm.value.username);
    // console.log("mode="+this.dataForm.value.mode);
    
  }
  addAccount(){
    this.presentToast(this.dataForm.value.username+":"+this.dataForm.value.secret+":"+this.dataForm.value.orgname+":"+this.dataForm.value.issuer+":"+this.dataForm.value.mode+":"+this.dataForm.value.hardlock+":"+this.dataForm.value.round);
    this.db.addAccount(this.dataForm.value.username,this.dataForm.value.secret,this.dataForm.value.orgname,this.dataForm.value.issuer,this.dataForm.value.mode,this.dataForm.value.hardlock,this.dataForm.value.round)
    .then(_ => {
      this.presentToast("เพิ่มบัญชีเรียบร้อย");
      this.modalController.dismiss();
    });
  }

  

  ngOnInit() {
  
  }
  async presentToast(text:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}

//import { NgModule } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GenOtpPage } from './gen-otp.page';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
const routes: Routes = [
  {
    path: '',
    component: GenOtpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundProgressModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GenOtpPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class GenOtpPageModule {}

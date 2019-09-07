import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { PopoverComponentComponent } from '../popover-component/popover-component.component';
import { ModaladduserPage } from '../modaladduser/modaladduser.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[PopoverComponentComponent,ModaladduserPage],
  declarations: [ProfilePage,PopoverComponentComponent,ModaladduserPage]
})
export class ProfilePageModule {}

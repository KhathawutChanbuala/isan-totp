import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
 
import { HttpClientModule } from '@angular/common/http';
import { Uid } from '@ionic-native/uid/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { Device } from '@ionic-native/device/ngx';
//import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

import { HammerGestureConfig,HAMMER_GESTURE_CONFIG } from "@angular/platform-browser";
import * as Hammer from 'hammerjs';
export class CustomHammerConfig extends HammerGestureConfig{
  overrides={
    'pan':{
      direction:Hammer.DIRECTION_ALL
    }
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    //RoundProgressModule,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SQLitePorter,
    Uid,
    AndroidPermissions,
    Clipboard,
    Device,
    BarcodeScanner,
    //RoundProgressModule,
    ScreenOrientation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide:HAMMER_GESTURE_CONFIG,useClass:CustomHammerConfig}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

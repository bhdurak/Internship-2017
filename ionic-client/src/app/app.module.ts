import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Facebook } from '@ionic-native/facebook';




import { CameraPage } from "../pages/camera/camera";
import { OutputPage } from "../pages/output/output";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,

    CameraPage,
    OutputPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [

    CameraPage,
    OutputPage,
  ],
  providers: [
    Camera,
    StatusBar,
    SplashScreen,
    FileTransfer,
    FilePath,
    File,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

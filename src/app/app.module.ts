import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DatabaseProvider } from '../providers/database/database';
import {AngularFireAuthModule} from "angularfire2/auth"
import {AngularFirestoreModule} from 'angularfire2/firestore'

import {AngularFireModule} from 'angularfire2'
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';
import { CrearviajePage } from '../pages/crearviaje/crearviaje';

var config = {
  apiKey: "AIzaSyCkJzzROoPXjQUVYPv7qEr_kNCjYW-D9YM",
  authDomain: "mate-ca9a8.firebaseapp.com",
  databaseURL: "https://mate-ca9a8.firebaseio.com",
  projectId: "mate-ca9a8",
  storageBucket: "",
  messagingSenderId: "319538735224"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    CrearviajePage, 
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistroPage,
    CrearviajePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}

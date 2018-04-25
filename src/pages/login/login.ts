import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth'
import { RegistroPage } from '../registro/registro';
import { HomePage } from '../home/home';
import { IUser } from '../../inteface/user.interface';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as IUser

  constructor(public fauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
    this.fauth.authState.subscribe(auth =>{
      if(auth != null){
        this.navCtrl.setRoot(HomePage);
      }
    })
  }

  registar(){
    this.navCtrl.push(RegistroPage)
  }

  ingresar(user:IUser){
    this.fauth.auth.signInWithEmailAndPassword(user.email,user.pass).then(() => {
      this.navCtrl.setRoot(HomePage)
    })
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IUser } from '../../inteface/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as IUser

  constructor(public fauth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  registrar(user:IUser){
    this.fauth.auth.createUserWithEmailAndPassword(user.email,user.pass).then(() => {
      this.navCtrl.setRoot(LoginPage)
    })
  }

}

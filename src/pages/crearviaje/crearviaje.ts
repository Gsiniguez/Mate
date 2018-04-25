import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IViaje } from '../../inteface/viaje.interface';
import {Observable} from 'rxjs/observable'

/**
 * Generated class for the CrearviajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crearviaje',
  templateUrl: 'crearviaje.html',
})
export class CrearviajePage {
  viajecoll:AngularFirestoreCollection<IViaje>
  viaje

  constructor(public fauth:AngularFireAuth,public fdb:AngularFirestore,public navCtrl: NavController, public navParams: NavParams) {
    this.fauth.authState.subscribe(auth => {
      this.viajecoll = this.fdb.collection(`${auth.email}`)
      this.viaje = this.viajecoll.valueChanges()
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearviajePage');
  }

  crearViaje(viaje, nombre, fechasalida, fechavuelta, total){
    this.viajecoll.doc(`${viaje}`).update({nombre, fechasalida, fechavuelta, total})
  }

}

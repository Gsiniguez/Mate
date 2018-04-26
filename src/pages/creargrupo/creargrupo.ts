import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { IGrupo } from '../../inteface/grupo.interface';

/**
 * Generated class for the CreargrupoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creargrupo',
  templateUrl: 'creargrupo.html',
})
export class CreargrupoPage {

  nombre_grupo= {} as IGrupo;

  constructor(public afs:AngularFirestore,public afa:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreargrupoPage');
  }

  crearGrupo(nombre,viaje){
    this.afa.authState.subscribe(auth => {
      this.afs.collection('grupos').doc(`${nombre}`).set({nombre:nombre,usuarios:[auth.email]}).then(() => {this.navCtrl.pop()})
    })
  }

  test(nombre_grupo){
    
    console.log(this.nombre_grupo)
  }
}

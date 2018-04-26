import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreargrupoPage } from '../creargrupo/creargrupo';
import { IGrupo } from '../../inteface/grupo.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  grupos = {} as IGrupo
  gruposRef:any;

  constructor(public afs:AngularFirestore,public afa:AngularFireAuth,public navCtrl: NavController) {
    this.obtenerGrupos()
  }
  
  agregarViaje(){
    this.navCtrl.push(CreargrupoPage)
  }

  obtenerGrupos(){
    this.afa.authState.subscribe(auth => {
      var gruposref = this.afs.collection('grupos',ref => ref.where('usuarios', '==', auth.email)).valueChanges().subscribe(data => {
         var n = data[0] as IGrupo
         console.log(n.nombre)
         this.grupos = n
        })
        
      //var query = gruposref.where
    })
  }

  test(){
    return new Promise (resolve =>{
      this.afs.collection('grupos').ref
    })
  }


}

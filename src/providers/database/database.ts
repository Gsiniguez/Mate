import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite'
import 'rxjs/add/operator/map'


@Injectable()
export class DatabaseProvider {
  private db:SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient, public storage:SQLite) {
    console.log('Hello DatabaseProvider Provider');
    if(!this.isOpen){
      this.storage = new SQLite()
      this.storage.create({name:'data.db',location:'default'}).then((db:SQLiteObject) =>{
        db.executeSql("CREATE TABLE IF NOT EXIST viajes(id INTEGER PRIMARY KEY AUTOINCREMENT, integrantes TEXT, gastos REAL)",[])
        this.isOpen = true
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  CreateViajes(integrantes:string, gastos:number){
    return new Promise((resolve,reject) => {
      let sql = "INSERT INTO viajes(integrantes, gastos) VALUES (?,?)"
      this.db.executeSql (sql, [integrantes,gastos]).then((data)=>{
        resolve(data)
      }), (error) => {
        reject(error)
      }
    })
  }

  GetViajes(){
    return new Promise((resolve , reject) =>{
      this.db.executeSql ("SELECT * FROM viajes", []).then((data)=>{
        let arrayViajes= []
        if(data.rows.lenght > 0){
          for(var i=0; i < data.rows.lenght; i++){
            arrayViajes.push({
              id: data.rows.item(i).id,
              integrantes:data.rows.item(i).integrantes,
              gastos: data.rows.item(i).gastos,
            })
          }
        }
        resolve(arrayViajes)
      }), (error) =>{
        reject(error)
      }
    })
  }
}


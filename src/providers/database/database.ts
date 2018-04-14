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
        db.executeSql("CREATE TABLE IF NOT EXIST materias(id INTEGER PRIMARY KEY AUTOINCREMENT, num INTEGER, name TEXT, estado TEXT, puedecursar TEXT, resta num)",[])
        this.isOpen = true
      }).catch((e) => {
        console.log(e)
      })
    }
  }

  CreateMaterias(num:number, name:string, estado:string, puedecursar:string, resta:number){
    return new Promise((resolve,reject) => {
      let sql = "INSERT INTO materias (num, name, estdo, puedecursar, resta) VALUES (?,?,?,?,?)"
      this.db.executeSql (sql, [num, name, estado, puedecursar, resta]).then((data)=>{
        resolve(data)
      }), (error) => {
        reject(error)
      }
    })
  }

  GetMaterias(){
    return new Promise((resolve , reject) =>{
      this.db.executeSql ("SELECT * FROM materias", []).then((data)=>{
        let arrayMaterias= []
        if(data.rows.lenght > 0){
          for(var i=0; i < data.rows.lenght; i++){
            arrayMaterias.push({
              id: data.rows.item(i).id,
              num:data.rows.item(i).num,
              name: data.rows.item(i).name,
              estado:data.rows.item(i).estado,
              puedecursar: data.rows.item(i).puedecursar,
              resta: data.rows.item(i).resta,
            })
          }
        }
        resolve(arrayMaterias)
      }), (error) =>{
        reject(error)
      }
    })
  }
}


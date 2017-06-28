import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username: any;
  items: any;
  database: any;
  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    this.database = this.sqlite.create({
      name: 'data.db',
      location: 'default'
    });
    this.database.then((db: SQLiteObject) => {
      db.executeSql('select * from usernameList', {}).then((data) => {
        this.items = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.items.push({ name: data.rows.item(i).name });
          }
        }
      }, (err) => {
        alert('Unable to execute sql: ' + JSON.stringify(err));
      });
    })
  }

  save() {
    if(this.username != ""){
      this.database.then((db: SQLiteObject) => {

        db.executeSql('CREATE TABLE IF NOT EXISTS usernameList(id INTEGER PRIMARY KEY AUTOINCREMENT,name)', {})
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));

        //create table section
        db.executeSql('INSERT INTO usernameList(name) VALUES(\'' + this.username + '\')', [])
          .then(() =>{
              console.log('Executed SQL')
            this.username = "";
          }).catch(e => console.log(e));

        db.executeSql('select * from usernameList', {}).then((data) => {
          this.items = [];
          if (data.rows.length > 0) {
            for (var i = 0; i < data.rows.length; i++) {
              this.items.push({ name: data.rows.item(i).name });
            }
          }
        }, (err) => {
          alert('Unable to execute sql: ' + JSON.stringify(err));
        });
      }).catch(e => console.log(JSON.stringify(e)));
    }else {
        alert("Please enter Username");
    }

  }

  removeItem(){
    this.database.then((db: SQLiteObject) => {
      //create table section

      db.executeSql('select * from usernameList', {}).then((data) => {
        this.items = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.items.push({ name: data.rows.item(i).name, id: data.rows.item(i).id });
          }
        }
      }, (err) => {
        alert('Unable to execute sql: ' + JSON.stringify(err));
      });
    }).catch(e => console.log(JSON.stringify(e)));
  }
}

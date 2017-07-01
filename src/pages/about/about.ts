import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Stepcounter } from '@ionic-native/stepcounter';
import { Hotspot } from '@ionic-native/hotspot';

import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private stepcounter: Stepcounter,
    private hotspot: Hotspot,
  private androidPermissions: AndroidPermissions) {
    // let startingOffset = 0;
    // this.stepcounter.start(startingOffset)
    //   .then(onSuccess =>
    //     console.log('stepcounter-start success', onSuccess),
    //   onFailure =>
    //     console.log('stepcounter-start error', onFailure));
    // this.stepcounter.getHistory()
    //   .then(historyObj =>
    //     console.log('stepcounter-history success', historyObj),
    //   onFailure =>
    //     console.log('stepcounter-history error', onFailure));

    // console.log(this.stepcounter.getStepCount());
    /*
      this.diagnostic.requestRuntimePermission(this.diagnostic.permission.).then( request => {
          this.createHotspot();
      });
      */
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_SETTINGS).then(success => {
        if(success.hasPermission){
          console.log('Permission not ');
          console.log(success);
          this.createHotspot();
        }else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_SETTINGS)
        }
      },err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_SETTINGS)
        console.log('Permission granted Fail: ' + err);
      });
  }

  createHotspot() {
    this.hotspot.createHotspot("hacker","Open","").then(hotspotcreate=>{
      console.log("hotspot created");
        this.hotspot.startHotspot().then( () => {
          console.log("start hotspot");
        }).catch(()=> {
          console.log("not start");
        });
    });
  }
}

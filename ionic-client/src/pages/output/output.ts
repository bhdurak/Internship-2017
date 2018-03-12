import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OutputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-output',
  templateUrl: 'output.html',
})
export class OutputPage {
  public selectedPicture: any;
  public outputString: any;

  ngOnInit(){
    this.outputString="";
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OutputPage');
    this.selectedPicture = this.navParams.get('picture');
    this.outputString = this.navParams.get('result');
  }

}

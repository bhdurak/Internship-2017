import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { OutputPage } from "../output/output";
import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook';
/**
 * Generated class for the CameraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  userData = null;
  public photos: any;                               //The array to keep the photos
  public output: any;                               //The array to keep the output of program
  public lang: any;
  private serverDestinationEng = 'http://visionserver.ceng.metu.edu.tr:8083/profileEng';      //Upload destination.
  private serverDestinationTr = 'http://visionserver.ceng.metu.edu.tr:8083/profileTr';      //Upload destination.

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController, private transfer: FileTransfer, private facebook: Facebook) {
  }

  ngOnInit(){
    this.photos=[];                                 //The array to keep the photos
    this.output=new Array(100);    //The array to keep the output of program
    this.lang="Engl";
  }

  //The function to add new picture
  takePicture(){

    //To select a picture from gallery
    const optionsGallery: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,     //To select from gallery
    destinationType: this.camera.DestinationType.NATIVE_URI,    //To get NATIVE_URI
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 400,                                           //To resize the picture
  }

    //To take new picture from camera
    const optionsCamera: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.CAMERA,           //To access camera
    destinationType: this.camera.DestinationType.NATIVE_URI,    //To get NATIVE_URI
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetWidth: 400,                                           //To resize the picture
  }


  //Pops when take picture button is clicked. In order to select the source.

if(this.lang=='Engl'){
    let alert = this.alertCtrl.create({
    title: 'Where to take the picture?',
    message: 'Would you like to take the picture from Gallery or take a new picture?',
    buttons: [
      {text: 'Select from Gallery',
        handler: () => {
          //By passing optionsGallery, the source is set to gallery.
          this.camera.getPicture(optionsGallery).then((imageData) => {
            //imageData is the NATIVE_URI of out picture.
           this.photos.push(imageData);
          }, (err) => {
           // Handle error
          });

        }
      },
      {
        text: 'Take a new Picture',
        handler: () => {
          //By passing optionsCamera, the source is set to camera
          this.camera.getPicture(optionsCamera).then((imageData) => {
            //imageData is the NATIVE_URI of out picture.
           this.photos.push(imageData);
          }, (err) => {
           // Handle error
          });
        }
      }
    ]
  });
  alert.present();
}

else if(this.lang=='Turk'){
    let alert = this.alertCtrl.create({
    title: 'Fotoğrafın Kaynağı',
    message: 'Galeriden bir görsel mi seçmek istersiniz yoksa yeni fotoğraf mı çekmek istersiniz?',
    buttons: [
      {text: 'Galeriden Seç',
        handler: () => {
          //By passing optionsGallery, the source is set to gallery.
          this.camera.getPicture(optionsGallery).then((imageData) => {
            //imageData is the NATIVE_URI of out picture.
           this.photos.push(imageData);
          }, (err) => {
           // Handle error
          });

        }
      },
      {
        text: 'Yeni Fotoğraf Çek',
        handler: () => {
          //By passing optionsCamera, the source is set to camera
          this.camera.getPicture(optionsCamera).then((imageData) => {
            //imageData is the NATIVE_URI of out picture.
           this.photos.push(imageData);
          }, (err) => {
           // Handle error
          });
        }
      }
    ]
  });
  alert.present();
}

}
  //The function to delete pictures
  deletePicture(index){

    //Confirmation alert
    if(this.lang=="Engl"){
      let alert = this.alertCtrl.create({
      title: 'Delete Picture?',
      message: 'Are you sure you would like to delete this picture?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            //Removes the selected index of photo from photos array
            this.photos.splice(index,1);
            this.output[index] = "";
          }
        }
      ]
    });
    alert.present();
  }
  else if(this.lang=="Turk"){
        let alert = this.alertCtrl.create({
        title: 'Fotoğrafı Sil?',
        message: 'Fotoğrafı silmek istediğinize emin misiniz?',
        buttons: [
          {
            text: 'İptal',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Sil',
            handler: () => {
              //Removes the selected index of photo from photos array
              this.photos.splice(index,1);
              this.output[index] = "";
            }
          }
        ]
      });
      alert.present();
    }
    //
  }
  //New FileTransferObject for upload. Details on Ionic Docs
  fileTransfer: FileTransferObject = this.transfer.create();

  //Upload function
  uploadEng(numb) {
    //the options for upload. Normally optional but server requests a key image.
    //therefore fileKey member is important. filename is generic
  let options: FileUploadOptions = {
    fileKey: 'image-Eng',
    fileName: 'image-Eng-'
  }

  //starts upload. Parameters are NATIVE_URI of specific photo, destination and
  //options specified in FileUploadOptions
  this.fileTransfer.upload(this.photos[numb],this.serverDestinationEng, options)
   .then((data) => {
     // success

     //Following three lines are for formatting of output
     //check server code (profile.js) for non-formatted normal version
     var fields = data.response.split(":")
     var withQuotes = fields[3]
     var withoutQuotes = withQuotes.split("\\t")

     //To map the output to the photos
     this.output[numb] = withoutQuotes[0];
     if(this.lang=="Engl") {
       alert("Upload Successful!");
     }
     else if(this.lang=="Turk") {
       alert("Yükleme Başarılı!");
     }
     this.navCtrl.push(OutputPage, {
       picture: this.photos[numb],
       result: this.output[numb],
     });
   }, (err) => {
     // error
     alert("Error");
   })
}

uploadTr(numb) {
  let options: FileUploadOptions = {
    fileKey: 'image-Tr',
    fileName: 'image-Eng-'
  }

  //starts upload. Parameters are NATIVE_URI of specific photo, destination and
  //options specified in FileUploadOptions
  this.fileTransfer.upload(this.photos[numb],this.serverDestinationTr, options)
   .then((data) => {
     // success

     //Following three lines are for formatting of output
     //check server code (profile.js) for non-formatted normal version
     var fields = data.response.split(":")
     var withQuotes = fields[3]
     var withoutQuotes = withQuotes.split("\\t")

     //To map the output to the photos
     this.output[numb] = withoutQuotes[0];
     if(this.lang=="Engl") {
       alert("Upload Successful!");
     }
     else if(this.lang=="Turk") {
       alert("Yükleme Başarılı!");
     }
     this.navCtrl.push(OutputPage, {
       picture: this.photos[numb],
       result: this.output[numb],
     });
   }, (err) => {
     // error
     alert("Error");
   })
}

showOutput(num){
  this.navCtrl.push(OutputPage, {
    picture: this.photos[num],
    result: this.output[num],
  });
}

selectLang(){
  if(this.lang=="Engl"){
      let alert = this.alertCtrl.create({
      title: 'Language',
      message: 'Current output language is English. Select output language',
      buttons: [
        {
          text: 'English',
          handler: () => {
            this.lang="Engl"
          }
        },
        {
          text: 'Turkish',
          handler: () => {
            this.lang="Turk"
          }
        },
      ]
    });
    alert.present();

  }
  if(this.lang=="Turk"){
      let alert = this.alertCtrl.create({
      title: 'Dil',
      message: 'Mevcut çıktı dili Türkçe. Çıktı dili seçiniz.',
      buttons: [
        {
          text: 'İngilizce',
          handler: () => {
            this.lang="Engl"
          }
        },
        {
          text: 'Türkçe',
          handler: () => {
            this.lang="Turk"
          }
        },
      ]
    });
    alert.present();

  }
}

loginWithFBEng(){
  this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse)=>{
    // By calling api, we request thing from FB
    // me indicates current user. Fields are requests. Them empty array is permissions. Not needed
    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
      this.userData = {
        email: profile['email'],
        first_name: profile['first_name'],
        picture: profile['picture_large']['data']['url'],
        name: profile['name'],
        id: profile['id'],
      }
      let alert = this.alertCtrl.create({
      title: 'Login Successful',
      message: 'Logged in as '+ this.userData.name+'.',
      buttons: [
        {
          text: 'Ok.',
          handler: () => {
          }
        },

      ]
    });
    alert.present();
    })
  })
}


loginWithFBTr(){
  this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse)=>{
    // By calling api, we request thing from FB
    // me indicates current user. Fields are requests. Them empty array is permissions. Not needed
    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
      this.userData = {
        email: profile['email'],
        first_name: profile['first_name'],
        picture: profile['picture_large']['data']['url'],
        name: profile['name'],
        id: profile['id'],
      }
      let alert = this.alertCtrl.create({
      title: 'Giriş Başarılı',
      message: this.userData.name+' olarak giriş yapıldı.',
      buttons: [
        {
          text: 'Tamam.',
          handler: () => {
          }
        },

      ]
    });
    alert.present();
    })
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

}

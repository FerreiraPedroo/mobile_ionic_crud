import { Component, OnInit } from '@angular/core';
import { User } from "/avformadoraIII/mobile_ionic_crud/contact-list/src/app/models/user.model";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user = {} as User;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  async registro(user: User){
    if (this.formValidation()) {
      let loader = await this.loadingCtrl.create({
        message: "Aguarde..."
      })
      await loader.present();

      try {
        await this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(data =>{
          console.log(data);

          this.navCtrl.navigateRoot("home")
        })
        
      } catch (error:any) {
        error.message = "Error para se registrar";
        let errorMessage = error.message || error.getLocalizedMessage();

        this.showToast(errorMessage)
      }

      await loader.dismiss();

    }
  }

  formValidation(){
    if (!this.user.email) {
      this.showToast("Insira um email");
      return false;
    }
    if (!this.user.password) {
      this.showToast("Insira uma senha");
      return false;
    }

    return false;
  }

  showToast(message: string){
    this.toastCtrl.create({
      message: message,
      duration: 4000
    }).then(toastData => toastData.present());
  }

}

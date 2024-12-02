import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  user: string = "";
  password: string = "";
  auth: any = null;

  constructor(private router: Router) {
    const app = initializeApp({
      apiKey: "AIzaSyB4Y_roLAEbFJ7700s0bKNW0CM4mtJ9fMs",
      authDomain: "listacontatos-1236b.firebaseapp.com",
      projectId: "listacontatos-1236b",
      storageBucket: "listacontatos-1236b.firebasestorage.app",
      messagingSenderId: "947222999578",
      appId: "1:947222999578:web:10610dd8d27068b274d7a3"
    });
    this.auth = getAuth(app);
  }

  async registro() {
    if (this.formValidation()) {
      createUserWithEmailAndPassword(this.auth, this.user, this.password)
        .then((userCredential) => {
          this.router.navigateByUrl('login');
        })
        .catch((error) => {
          console.log({ errorCode: error.code, errorMessage: error.message });
        });
    }
  }

  formValidation() {
    if (!this.user || !this.password) {
      return false;
    }
    return true;
  }
}

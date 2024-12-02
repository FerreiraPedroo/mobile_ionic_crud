import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user: string = "";
  password: string = "";
  auth: any = null;

  constructor(private router: Router) {
    const envirorment = {
      production: true,
      apiKey: "AIzaSyB4Y_roLAEbFJ7700s0bKNW0CM4mtJ9fMs",
      authDomain: "listacontatos-1236b.firebaseapp.com",
      projectId: "listacontatos-1236b",
      storageBucket: "listacontatos-1236b.firebasestorage.app",
      messagingSenderId: "947222999578",
      appId: "1:947222999578:web:10610dd8d27068b274d7a3"
    };

    const app = initializeApp(envirorment);
    this.auth = getAuth(app);
  }

  login() {
    signInWithEmailAndPassword(this.auth, this.user, this.password)
      .then((userCredential) => {
        this.router.navigate([`home`]);
      })
      .catch((error) => {
        console.log({ error })
      });
  }

}

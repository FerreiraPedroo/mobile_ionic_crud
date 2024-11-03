import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user: string = "";
  password: string = "";

  constructor() {
  }

  login(user: string) {
    console.log(this.password)
    console.log(this.user)

  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-body',
  templateUrl: './login-body.component.html',
  styleUrls: ['./login-body.component.css']
})
export class LoginBodyComponent implements OnInit {
  loginPlaceholder : string = "Введите логин";
  passwordPlaceholder : string = "Введите пароль";

  constructor() { }

  ngOnInit() { 
  }
  onClick (): void {
    if (!this.validateLogin()) return;

    var login = document.forms["login_form"]["inputLogin"].value;
    var password = document.forms["login_form"]["inputPassword"].value;
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/lab4_war/rest/user/login?login=' + login + "&password="+ password, false);
    xhr.send();
    if (xhr.status == 200) {
      sessionStorage.setItem("login", login);
      document.forms["login_form"].submit();
    }
    else document.getElementById("errorLabel").innerText = "Ошибка " + xhr.status + ": " + xhr.statusText;
  }

  validateLogin(): boolean {
    document.getElementById("errorLabel").innerText = "";
    var login = document.forms["login_form"]["login"].value;
    var password = document.forms["login_form"]["password"].value;
    var error = this.passwordCheck(login, password);

    if (error){
      document.getElementById("errorLabel").innerText = error;
      return false;
    }
    return true;
  }

  passwordCheck(login: string, password: string): string {
    if (login.length < 5 || login.length > 20)
        return "Длина логина должна быть в диапазоне от 5 до 20 символов!";
    if (password.length < 5 || password.length > 20)
        return "Длина пароля должна быть в диапазоне от 5 до 20 символов!";
}
}

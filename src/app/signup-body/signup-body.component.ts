import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-body',
  templateUrl: './signup-body.component.html',
  styleUrls: ['./signup-body.component.css']
})
export class SignupBodyComponent implements OnInit {
  loginPlaceholder : string = "Введите логин";
  passwordPlaceholder : string = "Введите пароль";
  passwordRepeatPlaceholder : string = "Введите пароль ещё раз";

  constructor() { }

  ngOnInit() { }

  onClick (): void {
    if (!this.validateSignup()) return;

    var login = document.forms["signup_form"]["login"].value;
    var password = document.forms["signup_form"]["password"].value;
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/lab4_war/rest/user/signup?login=' + login + "&password="+ password, false);
    xhr.send();
    if (xhr.status == 200) {
      sessionStorage.setItem("login", login);
      document.forms["signup_form"].submit();
    }
    else document.getElementById("errorLabel").innerText = "Ошибка " + xhr.status + ": " + xhr.statusText;
  }

  validateSignup(): boolean {
    document.getElementById("errorLabel").innerText = "";
    var login = document.forms["signup_form"]["login"].value;
    var password = document.forms["signup_form"]["password"].value;
    var repeatPassword = document.forms["signup_form"]["repeatPassword"].value;
    var error = this.passwordCheck(login, password);

    if (password !== repeatPassword)
        error = "Пароли не совпадают!";

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

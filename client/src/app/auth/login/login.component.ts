import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  baseURL: string = "http://localhost:3000/";

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient) { }


  submit() {
    console.log(this.loginForm.value.email + " " + this.loginForm.value.password)

    this.httpLogin(this.loginForm.value.email, this.loginForm.value.password)
  }

  httpLogin(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(this.baseURL + 'users/login', email + '/' + password)
  }
}

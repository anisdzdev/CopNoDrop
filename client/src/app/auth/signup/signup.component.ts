import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  baseURL: string = "http://localhost:3000/";

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
    ]),
    password2: new FormControl('',),
  });

  constructor(private http: HttpClient) { }


  submit() {
    console.log(this.signupForm.value.firstName + " " + this.signupForm.value.lastName + " " + this.signupForm.value.email + " " + this.signupForm.value.password + " " + this.signupForm.value.password2)

    // Verifying if there is a missing value
    if(
      this.signupForm.value.firstName=='' ||
      this.signupForm.value.lastName=='' ||
      this.signupForm.value.email=='' ||
      this.signupForm.value.password=='' ||
      this.signupForm.value.password2==''){
        alert("Missing value(s)")
    }

    // Verifying if password values match
    else {
      if(this.signupForm.value.password==this.signupForm.value.password2) {
        this.httpSignUp(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.email, this.signupForm.value.password)
      }

      else {
        alert("Passwords do not match");
      }
    }
  }

  httpSignUp(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    console.log("here")
    return this.http
      .post(this.baseURL + 'users/signup', firstName + '/' + lastName + '/' + email + '/' + password)
  }

}

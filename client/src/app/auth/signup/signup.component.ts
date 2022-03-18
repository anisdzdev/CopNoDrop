import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, throwError } from "rxjs";
import { MessageService } from 'primeng/api';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {

  response = new Response();
  baseURL: string = "http://localhost:3000/";

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl('',
      [
        Validators.required,
        Validators.min(2),
        Validators.max(50)
      ]),
    lastName: new FormControl('',
      [
        Validators.required,
        Validators.min(2),
        Validators.max(50)
    ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.min(5),
        Validators.max(255)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.max(1024),
        Validators.min(5)
    ]),
    password2: new FormControl('',
      [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.max(1024),
        Validators.min(5)
    ]),
  });

  isSeller: boolean;

  constructor(private http: HttpClient, private messageService: MessageService) { }

  handleChange(e) {
    this.isSeller = e.checked;
  }

  submit() {
    //console.log(this.signupForm.value.firstName + " " + this.signupForm.value.lastName + " " + this.signupForm.value.email + " " + this.signupForm.value.password + " " + this.signupForm.value.password2)

    // Verifying if password values match
      if(this.signupForm.value.password==this.signupForm.value.password2) {
        this.httpSignUp(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.email, this.signupForm.value.password, this.isSeller).subscribe(token =>console.log(this.getDecodedAccessToken(token)));
      }
      else {
        this.alertMessage("Error!", "Passwords do not match", "error");
      }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  httpSignUp(firstName: string, lastName: string, email: string, password: string, isSeller: boolean): Observable<any> {

    const requestOptions: Object = {
      headers: new HttpHeaders().append('Authorization', 'Bearer <yourtokenhere>'),
      responseType: 'text'
    }

    return this.http
      .post(this.baseURL + 'users/signup', {firstName, lastName, email, password, isSeller}, requestOptions)
      .pipe(catchError(this.handleError('httpSignUp')));
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return (error: Error): Observable<T> => {
        this.alertMessage("Error!", "Email already used", "error");
        return throwError('Email already used');
    };
  }

  alertMessage(title: string, message: string, type?: "error") {
    setTimeout(() => {
      this.messageService.add({
        severity: type,
        summary: title,
        detail: message,
      });
    }, 100);
  }
}

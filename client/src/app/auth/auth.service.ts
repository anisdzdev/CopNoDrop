import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import jwt_decode from 'jwt-decode';
import { MessageService } from 'primeng/api';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  response = new Response();
  url = 'http://localhost:3000/';
  islogin$: Observable<boolean>;
  isloginSubject: BehaviorSubject<boolean>;

  requestOptions: Object = {
    headers: new HttpHeaders().append(
      'Authorization',
      'Bearer <yourtokenhere>'
    ),
    responseType: 'text',
  };

  get currentisloginValue(): boolean {
    return this.isloginSubject.value;
  }

  set currentisloginValue(islogin: boolean) {
    this.isloginSubject.next(islogin);
  }
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    this.isloginSubject = new BehaviorSubject<boolean>(false);
    this.islogin$ = this.isloginSubject.asObservable();
  }

  login(user: User): Observable<any> {
    return this.http.post(`${this.url}users/login`, user, this.requestOptions).pipe(catchError(this.handleError('httpLogin')));
  }

  setUserToStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromStorage(): User {
    let user = null;
    if (localStorage.getItem('user')) {
      this.isloginSubject = new BehaviorSubject<boolean>(true);
      user = JSON.parse(localStorage.getItem('user'));
      this.islogin$ = this.isloginSubject.asObservable();
    }
    return user;
  }

  logout() {
    localStorage.removeItem('user');
    this.alertMessage("Success!", "You have been logged out", "success");
    this.isloginSubject.next(false);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  alertMessage(title: string, message: string, type?) {
    setTimeout(() => {
    this.messageService.add({
      severity: type || "success",
      summary: title,
      detail: message,
    });
    }, 100);
  }

  alertMessageError(title: string, message: string, type?: "error") {
    setTimeout(() => {
      this.messageService.add({
        severity: type,
        summary: title,
        detail: message,
      });
    }, 100);
  }

  alertMessageSuccess(title: string, message: string, type?) {
    setTimeout(() => {
    this.messageService.add({
      severity: type || "success",
      summary: title,
      detail: message,
    });
    }, 100);
  }

  private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      this.alertMessageError("Error!", "Please check credentials", "error")
      return throwError('Please check credentials');
    };
  }
}

export interface User {
  _id?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  password?: string;
  isSeller?: boolean;
  addresses?: {
    firstLine: string;
    city: string;
    province: string;
    country: string;
    postal_code: string;
    isDefault: boolean;
  };
  token?: string;
  iat?: number;
}

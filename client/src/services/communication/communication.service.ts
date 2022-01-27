import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommunicationService {
  private readonly BASE_URL: string = 'localhost:8001'; // This will need to be the url of the hosted server (not localhost)

  private readonly UNAUTHORIZED = 401;
  private readonly BAD_GATEWAY = 502;
  private readonly FORBIDDEN = 403;
  response = new Response();

  }

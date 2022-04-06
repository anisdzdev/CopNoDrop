import { Injectable } from '@angular/core';

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

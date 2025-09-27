import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../../models/authentication-request';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../../models/authentication-response';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class Authentication {

  private readonly authUrl = `${environment.api.baseUrl}${environment.api.authUrl}`

  constructor(
    private http : HttpClient
  ){}

  authenticateLogin(authRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(this.authUrl,authRequest)
  }
  
}

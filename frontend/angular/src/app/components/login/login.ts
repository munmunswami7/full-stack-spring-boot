import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from "primeng/button";
import { AuthenticationRequest } from '../../models/authentication-request';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../services/authentication/authentication';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, AvatarModule, ButtonDirective, FormsModule, MessageModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {


  authenticationRequest: AuthenticationRequest ={}
  errorMessage = ''

  constructor(
    private authenticationService: Authentication,
    private router: Router
  ){}


  login(){
    this.errorMessage =''
    this.authenticationService.authenticateLogin(this.authenticationRequest)
      .subscribe({
          next: (authenticationResponse) => {
            localStorage.setItem('user', JSON.stringify(authenticationResponse))
            this.router.navigate(['customers'])
          },
          error: (err) => {
            if(err.error.statusCode === 401){
              this.errorMessage = "Login/Password  is incorrect"
              
            }
          }
    })
  }

  register() {
    this.router.navigate(['register'])
  }
  
}

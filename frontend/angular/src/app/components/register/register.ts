import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from "primeng/button";
import { AuthenticationRequest } from '../../models/authentication-request';
import { FormsModule } from '@angular/forms';
import { Authentication } from '../../services/authentication/authentication';
import { MessageModule } from 'primeng/message';
import { NgIf } from '@angular/common';  
import { Router, RouterConfigOptions } from '@angular/router';
import { CustomerRegistrationRequest } from '../../models/customer-registration-request';
import { Customers } from '../../services/customers/customers';
import { AuthenticationResponse } from '../../models/authentication-response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, AvatarModule, ButtonDirective, FormsModule, MessageModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  customer: CustomerRegistrationRequest = {}

  constructor(
    private router:Router,
    private customerService: Customers,
    private authService: Authentication
  ){

  }
  login() {
    this.router.navigate(['login'])
  }
  errorMessage: any;

  createCustomer() {
    this.customerService.registerCustomer(this.customer)
    .subscribe({
      next: () => {
        const authRequest:AuthenticationRequest= {
          userName: this.customer.email,
          password: this.customer.password
        }
        this.authService.authenticateLogin(authRequest)
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
    })
  }

}

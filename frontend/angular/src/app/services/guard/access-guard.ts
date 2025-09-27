import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationResponse } from '../../models/authentication-response';
import { JwtHelperService } from "@auth0/angular-jwt"
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate{

  private platformID = inject(PLATFORM_ID)
  constructor(
    private router: Router
  ){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(isPlatformBrowser(this.platformID)){
    const storedUser =localStorage.getItem('user')
      if(storedUser){
        const authResponse : AuthenticationResponse = JSON.parse(storedUser)
        const token = authResponse.token
        if(token){
          const jwtHelper = new JwtHelperService();
          const isTokenNotExpired: boolean = !jwtHelper.isTokenExpired(token)
          if(isTokenNotExpired){
            return true
          }
        }
      }
  }
    this.router.navigate(['login'])
    return false;
  }


  //   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
  //   throw new Error('Method not implemented.');
  // }
  
}

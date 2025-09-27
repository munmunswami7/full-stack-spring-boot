import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthenticationResponse } from '../../models/authentication-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  standalone: true,
  imports: [ButtonModule, RippleModule, AvatarModule, AvatarGroupModule, MenuModule],
  templateUrl: './header-bar.html',
  styleUrls: ['./header-bar.scss']
})
export class HeaderBar {

  constructor(
    private router: Router
  ){

  }

  items:Array<MenuItem> = [
    {
      label: 'Profile',
      icon: 'pi pi-user'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog'
    },
    {
      separator: true
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        localStorage.clear
        this.router.navigate(['login'])
        
      }
    },

  ]

  get userName() : string{
    const storedUserAtLocalStorage = localStorage.getItem('user')
    if(storedUserAtLocalStorage){
      const authResponse: AuthenticationResponse= JSON.parse(storedUserAtLocalStorage)
      if(storedUserAtLocalStorage && authResponse.customerDTO && authResponse.customerDTO.username){
        return authResponse.customerDTO.username
      }
    }
    return '--';
  }

  get userRole() : string{
    const storedUserAtLocalStorage = localStorage.getItem('user')
    if(storedUserAtLocalStorage){
      const authResponse: AuthenticationResponse= JSON.parse(storedUserAtLocalStorage)
      if(storedUserAtLocalStorage && authResponse.customerDTO && authResponse.customerDTO.roles){
        return authResponse.customerDTO.roles[0]
      }
    }
    return '--';
  }

}

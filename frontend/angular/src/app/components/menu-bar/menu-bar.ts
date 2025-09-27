import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { NgFor } from '@angular/common';      // ✅ gives you *ngFor
import { NgClass } from '@angular/common';
import { MenuItems } from '../menu-items/menu-items';


@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule, MenuModule, NgFor, MenuItems],
  templateUrl: './menu-bar.html',
  styleUrls: ['./menu-bar.scss']
})
export class MenuBar {
  menu: Array<MenuItem> = [
    {label: 'Home', icon:'pi pi-fw pi-plus'},
    {label: 'Customers', icon:'pi pi-users'},
    {label: 'Settings', icon:'pi pi-cog'},
  ]

}

import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [],
  templateUrl: './menu-items.html',
  styleUrls: ['./menu-items.scss']
})
export class MenuItems {
  
  @Input()
  menuItem: MenuItem = {}

}

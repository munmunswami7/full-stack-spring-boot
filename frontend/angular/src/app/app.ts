import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputTextModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

  protected readonly title = signal('angular');

  value:string = '' ;

}

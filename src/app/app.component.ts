import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { NavAuthComponent } from "./components/nav-auth/nav-auth.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavAuthComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{}

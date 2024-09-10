import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  imports: [],
  templateUrl: './stars.component.html',
  styleUrl: './stars.component.scss'
})
export class StarsComponent {
  star:InputSignal<number> = input.required();
}

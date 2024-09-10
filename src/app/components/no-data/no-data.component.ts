import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {
  text:InputSignal<string> = input.required();
}

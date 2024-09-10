import { Component, input, Input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-headline',
  standalone: true,
  imports: [],
  templateUrl: './headline.component.html',
  styleUrl: './headline.component.scss'
})
export class HeadlineComponent {
  headlineText:InputSignal<string> = input.required();
}

import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonConfig } from '../../models/button.model';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  buttonConfig = input.required<ButtonConfig>();
  isDisabled = input<boolean>(false);
}

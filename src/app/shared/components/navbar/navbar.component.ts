import { Component, input, output } from '@angular/core';
import { NavbarConfig } from '../../models/navbar.model';
import { ButtonComponent } from '../button/button.component';
import { ButtonConfig } from '../../models/button.model';

const COMPONENTS = [
  ButtonComponent,
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ...COMPONENTS
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavBarComponent {

  navbarConfig = input.required<NavbarConfig>();

  onClickButton = output<ButtonConfig>();

}

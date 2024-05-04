import { Component, inject, input } from '@angular/core';
import { AlertPopupConfig, TIMER } from '../../models/alert-popup.model';
import { AlertPopupService } from '../../services/alert-popup.service';

@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [],
  templateUrl: './alert-popup.component.html',
  styleUrl: './alert-popup.component.scss',
})
export class AlertPopupComponent {
  // Variables
  customClass: string = '';
  private timer: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);

  // Input
  alertPopupConfig = input.required<AlertPopupConfig>();

  // Inject
  alertPopupService = inject(AlertPopupService);

  // Set custom class after TIMER constant
  constructor() {
    this.timer = setTimeout(() => {
      this.customClass = 'hide';
    }, TIMER);
  }

  // Clean timer when click on close button
  resetTimer() {
    clearTimeout(this.timer);
  }
}

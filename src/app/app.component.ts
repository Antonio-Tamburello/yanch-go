import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlertPopupComponent } from './shared/components/alert-popup/alert-popup.component';
import { AlertPopupConfig } from './shared/models/alert-popup.model';
import { AlertPopupService } from './shared/services/alert-popup.service';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    AlertPopupComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'yanchware-go';

  // Inject
  alertPopupService = inject(AlertPopupService);

  // Variables
  alertPopupConfig = signal<AlertPopupConfig>({
    alertType: 'success',
    label: 'test',
    isVisible: true,
  });
  isVisible = signal<boolean>(false);

  // Subscription
  alertPopupSubject$: Subscription = this.alertPopupService.alertPopupSubject.pipe(
    filter(Boolean)
  ).subscribe((alertPopupConfig: AlertPopupConfig) =>{
    this.isVisible.set(alertPopupConfig.isVisible);
  });

}

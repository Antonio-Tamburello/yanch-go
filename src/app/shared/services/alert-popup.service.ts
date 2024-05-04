import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertPopupConfig, TIMER } from '../models/alert-popup.model';

@Injectable({
  providedIn: 'root',
})
export class AlertPopupService {
  // Variables
  private timer: ReturnType<typeof setTimeout> = setTimeout(() => {}, 0);

  // Observable
  alertPopupSubject: Subject<AlertPopupConfig> =
    new Subject<AlertPopupConfig>();

  // Show alert popup
  show(alertPopupConfig: AlertPopupConfig) {
    this.alertPopupSubject.next({ ...alertPopupConfig, isVisible: true });
    this.timer = setTimeout(() => {
      this.hide();
    }, TIMER + 500);
  }

  // Hide alert popup
  hide() {
    this.alertPopupSubject.next({
      ...({} as AlertPopupConfig),
      isVisible: false,
    });
    clearInterval(this.timer);
  }
}

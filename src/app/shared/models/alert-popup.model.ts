export const TIMER = 7000;

export type AlertPopupType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

export interface AlertPopupConfig {
  alertType: AlertPopupType;
  label: string;
  isVisible: boolean;
}

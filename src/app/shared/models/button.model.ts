type ButtonClassType =
  | 'btn'
  | 'btn-primary'
  | 'btn-secondary'
  | 'btn-success'
  | 'btn-danger'
  | 'btn-warning'
  | 'btn-info'
  | 'btn-light'
  | 'btn-dark'
  | 'btn-link'
  | 'btn-outline-primary'
  | 'btn-outline-secondary'
  | 'btn-outline-success'
  | 'btn-outline-danger'
  | 'btn-outline-warning'
  | 'btn-outline-info'
  | 'btn-outline-light'
  | 'btn-outline-dark';

type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonConfig {
  classButtonType: ButtonClassType;
  typeButtonType: ButtonType;
  label: string;

  customClass?: string;
  isDisabled?: boolean;
  routerLink?: string;
  // href?: string;
  value?: string;
}

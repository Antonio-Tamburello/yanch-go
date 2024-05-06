import { ValidatorFn } from '@angular/forms';
import { ButtonConfig } from './button.model';

export interface FormOutputModel {
  [key: string]: string;
}

type TypeFormModel = 'login' | 'register' | 'search';

export interface FormModel {
  type: TypeFormModel;
  inputElements: InputFormModel[];
  
  buttonElements?: ButtonConfig[];
  title?: TitleFormModel;
  cardCustomClass?: string;
  backgroundSrc?: string;
  logoSrc?: string;
  footerText?: FooterTextModel;
  footerLogo?: FooterLogoModel;
}

export interface InputFormModel {
  label: string;
  inputType: InputFormType;
  inputValidator: ValidatorFn[];
  customClass?: string;
}

export type InputFormType = 'text' | 'email' | 'password';

export interface TitleFormModel {
  label: string;
  customClass?: string;
}

export interface FooterTextModel {
  text: string;
  labelLink: string;
  routerLink: string;
}

export interface FooterLogoModel {
  label: string;
  logoSrc: string;
}

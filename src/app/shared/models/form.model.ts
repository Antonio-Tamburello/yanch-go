import { ValidatorFn } from '@angular/forms';

export interface FormOutputModel {
  [key: string]: string;
}

type TypeFormModel = 'login' | 'register';

export interface FormModel {
  type: TypeFormModel;
  backgroundSrc?: string;
  logoSrc: string;
  title: TitleFormModel;
  inputElements: InputFormModel[];
  buttonElements: ButtonFormModel[];
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

export interface ButtonFormModel {
  type: string;
  label: string;
}

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

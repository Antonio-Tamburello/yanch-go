import { Component, inject } from '@angular/core';
import { UserFacade } from '../../store/user/user.facade';
import { Subscription, filter } from 'rxjs';
import { Validators } from '@angular/forms';
import { ROUTE } from '../../../constants/route';
import { IMAGES } from '../../../constants/images';
import { FormComponent } from '@src/app/shared/components/form/form.component';
import { FormModel, FormOutputModel } from '@src/app/shared/models/form.model';
import { LoginRegisterService } from '../../services/loginRegisterService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Variables
  formModel: FormModel = {
    type: 'login',
    logoSrc: IMAGES.YANCHWAREGO_LOGO,
    title: {
      label: 'Sign in',
    },
    inputElements: [
      {
        label: 'Email',
        inputType: 'email',
        inputValidator: [Validators.required, Validators.email],
        customClass: 'mb-2',
      },
      {
        label: 'Password',
        inputType: 'password',
        inputValidator: [Validators.required, Validators.minLength(6)],
        customClass: 'mb-3',
      },
    ],
    buttonElements: [{ type: 'primary', label: 'Sign in' }],
    footerText: {
      text: 'Don’t you have an account?',
      labelLink: 'Create new one',
      routerLink: `/${ROUTE.REGISTER}`,
    },
    footerLogo: {
      label: 'Powered by',
      logoSrc: IMAGES.YANCHWARE_LOGO,
    },
  };

  // Inject
  userFacade = inject(UserFacade);
  loginRegisterService = inject(LoginRegisterService);

  token: Subscription = this.userFacade.token$
    .pipe(filter(Boolean))
    .subscribe((token) => {
      console.log('Token:', token);
    });


  onSubmitForm(formOutputModel: FormOutputModel) {
    this.userFacade.login({
      email: formOutputModel['email'],
      password: formOutputModel['password'],
    });
  }
}

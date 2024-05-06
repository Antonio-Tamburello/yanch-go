import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormModel, FormOutputModel, InputFormModel } from '../../models/form.model';
import { CardComponent } from '../card/card.component';
import { CardConfig } from '../../models/card.model';
import { AlertPopupService } from '../../services/alert-popup.service';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';

/**
 * Array of modules used in the form component.
 */
const MODULE = [CommonModule, ReactiveFormsModule, RouterLink];

/**
 * Array of components used in the component.
 */
const COMPONENTS = [CardComponent, ButtonComponent, InputComponent];

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ...MODULE,
    ...COMPONENTS
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  // Variables
  protected form: FormGroup = new FormGroup({});

  cardModel: CardConfig = {
    cardBodyCustomClass: 'px-5 form__card',
  };

  // Input
  formModel = input.required<FormModel>();

  // Output
  onSubmitForm = output<FormOutputModel>();

  // Inject
  formBuilder = inject(FormBuilder);
  alertPopupService = inject(AlertPopupService);

  ngOnInit(): void {
    this.formModel()?.inputElements.forEach((input: InputFormModel) => {
      this.form.addControl(
        input.label.toLowerCase().trim(),
        this.formBuilder.control('', [...input.inputValidator])
      );
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (
        this.formModel().type === 'register' &&
        this.form.value.password !== this.form.value['confirm password']
      ) {
        /*
        * Handle password mismatch with a custom alert popup.
        */
        this.alertPopupService.show({
          alertType: 'danger',
          label: 'Passwords do not match',
          isVisible: true,
        });
        return;
      }
      this.onSubmitForm.emit(this.form.value);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');

    }
    this.form.reset();
  }


  updateFormValue(value: FormControl) {
    this.form.patchValue(value);
  }
}

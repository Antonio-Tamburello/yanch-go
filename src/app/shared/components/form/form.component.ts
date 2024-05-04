import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormModel, FormOutputModel, InputFormModel } from '../../models/form.model';
import { CardComponent } from '../card/card.component';
import { CardModel } from '../../models/card.model';

/**
 * Array of modules used in the form component.
 */
const MODULE = [CommonModule, ReactiveFormsModule, RouterLink];

/**
 * Array of components used in the component.
 */
const COMPONENTS = [CardComponent];

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

  cardModel: CardModel = {
    cardBodyCustomClass: 'px-5 form__card',
  };

  // Input
  formModel = input.required<FormModel>();

  // Output
  onSubmitForm = output<FormOutputModel>();

  // Inject
  formBuilder = inject(FormBuilder);

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
        // Handle password mismatch
        alert('Passwords do not match');
        return;
      }
      this.onSubmitForm.emit(this.form.value);
    } else {
      // Handle form validation errors
      console.log('Form is invalid');
    }
  }
}

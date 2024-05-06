import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, input, output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { InputFormModel } from '../../models/form.model';
import { filter } from 'rxjs';

const MODULE = [CommonModule, ReactiveFormsModule];

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [...MODULE],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  form: FormGroup = new FormGroup({});

  inputElement = input.required<InputFormModel>();
  formControlName = input.required<string>();
  id = input.required<string>();

  valueChanges = output<FormControl>();

  output = this.form.valueChanges.subscribe((event) => {
    this.valueChanges.emit(event)
  });

  ngOnInit(): void {
    this.form.addControl(
      this.formControlName().toLowerCase().trim(),
      this.formBuilder.control('', [...this.inputElement().inputValidator])
    );
  }
}

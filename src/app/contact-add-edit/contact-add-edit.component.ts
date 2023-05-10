import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.scss']
})
export class ContactAddEditComponent {
  contactForm: FormGroup;

  education: string[] = [
    'Matriculation',
    'Intermediate',
    'Diploma',
    'Bachelor\'s',
    'Master\'s Degree',
    'Doctorate',
    'Associate Degree',
    'Vocational Training',
    'Professional Certification',
    'Other'
  ]

  constructor(private _fb: FormBuilder) {
    this.contactForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      bornDate: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  onFormSubmit() {
    if (this.contactForm.valid) {
      console.log('print:', this.contactForm.value)
    }
  }

}
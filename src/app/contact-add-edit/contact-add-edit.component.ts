import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { DialogRef } from '@angular/cdk/dialog';

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

  constructor(private _fb: FormBuilder, private _contactService: ContactService
    ,private _dialogRef: DialogRef<ContactAddEditComponent>) {
    this.contactForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      bornDate: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      salary: '',
    })
  }

  onFormSubmit() {
    if (this.contactForm.valid) {
      this._contactService.addContact(this.contactForm.value)
        .subscribe({
          next: (val: any) => {
            alert('Contact added successfully')
            this._dialogRef.close()
        },
          error: (err) => {
            console.log(err)
          }
        })
    }
  }

}
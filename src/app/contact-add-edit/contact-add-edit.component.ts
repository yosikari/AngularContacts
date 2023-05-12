import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-add-edit',
  templateUrl: './contact-add-edit.component.html',
  styleUrls: ['./contact-add-edit.component.scss']
})
export class ContactAddEditComponent implements OnInit {
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

  ngOnInit(): void {
    this.contactForm.patchValue(this.data)
  }

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _dialogRef: MatDialogRef<ContactAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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
      if (this.data) {
        this._contactService.updateContact(this.data.id, this.contactForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Contact updated successfully')
              this._dialogRef.close(true)
            },
            error: (err) => {
              console.log(err)
            }
          })
      } else {
        this._contactService.addContact(this.contactForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Contact added successfully')
              this._dialogRef.close(true)
            },
            error: (err) => {
              console.log(err)
            }
          })
      }
    }
  }

}
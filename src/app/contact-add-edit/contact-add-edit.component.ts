import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';


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

  get genderControl() {
    return this.contactForm.get('gender')
  }

  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _dialogRef: MatDialogRef<ContactAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bornDate: ['', Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      salary: ['', Validators.required]
    })
  }

  onFormSubmit() {
    if (this.contactForm.valid) {
      if (this.data) {
        this._contactService.updateContact(this.data.id, this.contactForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Contact updated successfully.')
              this._dialogRef.close(true)
            },
            error: (err) => {
              this._coreService.openSnackBar('Something went wrong.')
              console.log(err)
            }
          })
      } else {
        this._contactService.addContact(this.contactForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Contact added successfully.')
              this._dialogRef.close(true)
            },
            error: (err) => {
              this._coreService.openSnackBar('Something went wrong.')
              console.log(err)
            }
          })
      }
    }
  }

}
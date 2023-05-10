import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';

  constructor(private _dialog: MatDialog){}

  openAddEditContactFrom(){
    this._dialog.open(ContactAddEditComponent)
  }
}

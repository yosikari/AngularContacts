import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddEditComponent } from './contact-add-edit/contact-add-edit.component';
import { ContactService } from './services/contact.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'bornDate', 'education', 'experience', 'salary', 'company']
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(
    private _dialog: MatDialog,
    private _contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.getContacts()
  }

  openAddEditContactFrom() {
    this._dialog.open(ContactAddEditComponent)
  }

  getContacts() {
    this._contactService.getContacts().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

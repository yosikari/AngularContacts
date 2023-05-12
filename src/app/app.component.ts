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

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'gender', 'bornDate', 'education', 'experience', 'salary', 'company', 'action']
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
    const dialogRef = this._dialog.open(ContactAddEditComponent)
    dialogRef.afterClosed().subscribe({
      next: (isSubmit) => {
        if (isSubmit) this.getContacts()
      }
    })
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

  deleteContact(id: number) {
    this._contactService.deleteContact(id).subscribe({
      next: (res) => {
        alert('Contact deleted')
        this.getContacts()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  calculateAge(bornDate: string): number {
    const birthDate = new Date(bornDate)
    const today = new Date()

    let age = today.getFullYear() - birthDate.getFullYear()

    // Check if the birthday has not occurred yet this year
    const hasBirthdayOccurred = today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate())
    if (!hasBirthdayOccurred) age--
    return age
  }

}

import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Person } from 'src/app/Models/person';
import { PersonService } from 'src/app/Services/person-service.service';
import { ConfirmationModalComponent } from './../../shared/Modals/confirmation-modal/confirmation-modal.component';
import { PersonFormModalComponent } from './../../shared/Modals/person-form-modal/person-form-modal.component';


@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html',
  styleUrls: ["./dashboard.component.scss"],
})

export class DashboardComponent implements OnInit,AfterViewInit,OnDestroy{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public displayedColumns: string[] = ['firstName', 'age', 'job'];
  public columnsToDisplay: string[] = [...this.displayedColumns, 'actions'];

  /**
   * it holds a list of active filter for each column.
   * example: {firstName: {contains: 'person 1'}}
   *
   */
  public columnsFilters = {};

  public dataSource: MatTableDataSource<Person>;
  private serviceSubscribe!: Subscription;

  constructor(private personsService: PersonService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Person>();
  }   

  edit(data: Person) {
    const dialogRef = this.dialog.open(PersonFormModalComponent, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.edit(result);
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personsService.remove(id);
      }
    });
  }
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * initialize data-table by providing persons list to the dataSource.
   */
  ngOnInit(): void {
   
  }

  ngOnDestroy(): void {
    this.serviceSubscribe.unsubscribe();
  }
}



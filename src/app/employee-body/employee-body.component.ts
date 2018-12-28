import { EmployeeService } from './../employee.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DialogContentComponent } from './../dialog-content/dialog-content.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
@Component({
  selector: 'app-employee-body',
  templateUrl: './employee-body.component.html',
  styleUrls: ['./employee-body.component.css']
})
export class EmployeeBodyComponent implements OnInit {
  EmployeeDetails: string[];
  rows;
  constructor(public dialog: MatDialog, private http: HttpClient, private service: EmployeeService) { }

  //filtered data displaying conditions
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'mobile', 'city', 'departmentName', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  // data = [
  //   { fullName: 'SNS Raghu Babu', email: 'raghu@gmail.com', mobile: 9491124558, city: 'Bhimavaram', departmentName: 'Development' },
  //   { fullName: 'Mani Babu', email: 'mani@gmail.com', mobile: 9490024558, city: 'RJY', departmentName: 'Development' },
  //   { fullName: 'Gopal', email: 'gopal@gmail.com', mobile: 9491124008, city: 'BVRT', departmentName: 'Development' },
  // ];


  //to load the records when page is loaded
  ngOnInit() {
        // this.listData = new MatTableDataSource(this.data);
        // this.listData.sort = this.sort;
        // this.listData.paginator = this.paginator; 


    this.http.get('http://172.17.15.21:3000/getProducts')
      .subscribe((response) => {
        this.EmployeeDetails = response as string[];
        this.rows = response;
        console.log(this.rows);

        this.listData = new MatTableDataSource(this.rows);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  //this method is for displaying the dialog box for registring the new Employee
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      height: '500px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  //method to search records
  updateFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  //method for on edit button click 
  onEdit(row) {
    this.service.populateForm(row);
    const dialogRef = this.dialog.open(DialogContentComponent, {
      height: '500px',
      width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Method to call when delete button clicked
  onDelete($empid) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteEmployee($empid);
    }
  }

}

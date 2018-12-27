import { DialogContentComponent } from './../dialog-content/dialog-content.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
@Component({
  selector: 'app-employee-body',
  templateUrl: './employee-body.component.html',
  styleUrls: ['./employee-body.component.css']
})
export class EmployeeBodyComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(){
    const dialogRef = this.dialog.open(DialogContentComponent, {
      height: '500px',
      width: '800px',
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

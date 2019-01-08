import { NotificationService } from './../notification.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { DatePipe } from '../../../node_modules/@angular/common';
import { EmployeeService } from './../employee.service';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  selected = 'Dev';
  EmployeeDetails: string[];
  rows;

  constructor(private service: EmployeeService, private notificationService: NotificationService, public dialogRef: MatDialogRef<DialogContentComponent>, private http: HttpClient, private datePipe: DatePipe, @Inject(MAT_DIALOG_DATA) public data: any) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'Phone', 'City', 'Dept', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  onClose() {
    this.signupForm.reset();
    this.dialogRef.close();
    this.notificationService.success('Dialog Box closed Successfully..');
  }

  onClear() {
    this.signupForm.reset();
    this.notificationService.success('Data Has been Reset Successfully..');
  }
  result = '';

  signupForm: FormGroup;
  //here we are validating the input fields
  ngOnInit() {

    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'Id': new FormControl(null),
        'FirstName': new FormControl(null, [Validators.required]),
        'LastName': new FormControl(null, [Validators.required]),
        'Email': new FormControl(null, [Validators.required, Validators.email]),
        'Phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        'City': new FormControl(null, [Validators.required]),
        'Gender': new FormControl(null),
        'Dept': new FormControl(null),
        'HireDate': new FormControl('')
      }),

    });
    if (this.data) {
      this.fillForm(this.data);
    }
  }

  fillForm(employee) {
    this.signupForm.controls.userData.patchValue({
      Id: employee.Id,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
      Phone: employee.Phone,
      City: employee.City,
      Gender: employee.Gender,
      Dept: employee.Dept,
      HireDate: employee.HireDate == "" ? "" : this.datePipe.transform(employee.HireDate, 'yyyy-MM-dd'),
    })
    // console.log("FillForm", this.signupForm.value.userData.FirstName)
    // console.log("with data", this.data.Id)
  }
 
  //In this method we will post the data to the target URL with input data.
  onSubmit() {
    //if(this.data.Id !== null || this.data.Id !== undefined) {
    if (this.data !== null ) {
      //put
      console.log("when ID is present", this.data.Id);
      this.http.put('http://localhost:5000/emp/updateEmployee/' + this.data.Id, {
        //Id:this.signupForm.value.userData.Id,
        FirstName: this.signupForm.value.userData.FirstName,
        LastName: this.signupForm.value.userData.LastName,
        Email: this.signupForm.value.userData.Email,
        Phone: this.signupForm.value.userData.Phone,
        City: this.signupForm.value.userData.City,
        Gender: this.signupForm.value.userData.Gender,
        Dept: this.signupForm.value.userData.Dept,
        HireDate: this.signupForm.value.userData.HireDate == "" ? "" : this.datePipe.transform(this.signupForm.value.userData.HireDate, 'yyyy-MM-dd'),

      }).subscribe(
        res => {
          console.log(res);
          this.result = 'Registration was Successful...'
          this.notificationService.success(':: Submitted successfully');
          this.dialogRef.close("updated");
        },
        err => {
          this.notificationService.success(':: Data Not Updated');
          console.log('Error occured');
          this.result = ' Registration was not successful'
        }
      );

    } else {
      //post
      this.http.post('http://localhost:5000/emp/insertEmployee', {
        FirstName: this.signupForm.value.userData.FirstName,
        LastName: this.signupForm.value.userData.LastName,
        Email: this.signupForm.value.userData.Email,
        Phone: this.signupForm.value.userData.Phone,
        City: this.signupForm.value.userData.City,
        Gender: this.signupForm.value.userData.Gender,
        Dept: this.signupForm.value.userData.Dept,
        HireDate: this.signupForm.value.userData.HireDate == "" ? "" : this.datePipe.transform(this.signupForm.value.userData.HireDate, 'yyyy-MM-dd'),

      })
        .subscribe(
          res => {
            console.log(res);
            this.result = 'Registration was Successful...'
            this.dialogRef.close("submitted");
            this.notificationService.success(':: Submitted successfully');
          },
          err => {
            this.notificationService.success(':: Data Not Submitted');
            console.log('Error occured');
            this.result = ' Registration was not successful'
          }
        );
    }
  }
}

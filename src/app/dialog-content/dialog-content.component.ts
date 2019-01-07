import { NotificationService } from './../notification.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { DatePipe } from '../../../node_modules/@angular/common';
import { EmployeeService } from './../employee.service';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  selected='Dev';

  constructor( private service: EmployeeService, private notificationService: NotificationService,public dialogRef: MatDialogRef<DialogContentComponent>,private http: HttpClient, private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose() {
    this.signupForm.reset();
    this.dialogRef.close();
    this.notificationService.success('Dialog Box closed Successfully..');
  }

  onClear(){
      this.signupForm.reset();
      this.notificationService.success('Data Cleared Successfully..');
  }
  result = '';
  

//

  signupForm: FormGroup;
  //here we are validating the input fields
  ngOnInit() {
  
    //console.log("Check this--",this.data.signupForm.userData.FirstName);
    //this.signupForm.value.userData.FirstName = this.data.employee.FirstName;
    // this.signupForm.value.userData.lname = this.data.lname
    // this.signupForm.value.userData.email= this.data.email 
    // this.signupForm.value.userData.mobile= this.data.mobile
    // this.signupForm.value.userData.city= this.data.city
    // this.signupForm.value.userData.gender= this.data.gender
    // this.signupForm.value.userData.dept= this.data.dept 
    // this.signupForm.value.userData.hireData= this.data.hireData 
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'Id':new FormControl(null),
        'FirstName': new FormControl(null, [Validators.required]),
        'LastName': new FormControl(null, [Validators.required]),
        'Email': new FormControl(null, [Validators.required, Validators.email]),
        'Phone': new FormControl(null, [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        'City' : new FormControl(null, [Validators.required]),
        'Gender': new FormControl(null),
        'Dept': new FormControl(null),
        'HireDate': new FormControl('')
      }),

    });
  }
  //In this method we will post the data to the target URL with input data.
  onSubmit() {
    //console.log(this.signupForm.value.userData);   
    this.http.post('http://localhost:3000/emp/postemployee', {
      FirstName: this.signupForm.value.userData.FirstName,
      LastName: this.signupForm.value.userData.LastName,
      Email: this.signupForm.value.userData.Email,
      Phone: this.signupForm.value.userData.Phone,
      City : this.signupForm.value.userData.City,
      Gender: this.signupForm.value.userData.Gender,
      Dept: this.signupForm.value.userData.Dept,
      HireDate: this.signupForm.value.userData.HireDate == "" ? "" : this.datePipe.transform( this.signupForm.value.userData.HireDate, 'yyyy-MM-dd'),
      //HireDate: this.signupForm.value.userData.hireDate,
    })
      .subscribe(
        res => {
          console.log(res);
          this.result = 'Registration was Successful...'
          this.dialogRef.close();
          this.notificationService.success(':: Submitted successfully');
        },
        err => {
         // this.notificationService.success(':: Data Not Submitted');
          console.log('Error occured');
          this.result = ' Registration was not successful'
        }
      );
  }

  
}

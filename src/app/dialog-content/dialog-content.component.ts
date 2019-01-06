import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { DatePipe } from '../../../node_modules/@angular/common';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  selected='Dev';

  constructor( public dialogRef: MatDialogRef<DialogContentComponent>,private http: HttpClient, private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public data: any) {}

  onClose() {
    this.signupForm.reset();
    this.dialogRef.close();
  }

  onClear(){
      this.signupForm.reset();
  }
  result = '';
  

//

  signupForm: FormGroup;
  //here we are validating the input fields
  ngOnInit() {
    console.log("Check this--",this.signupForm);
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
    this.http.post('http://localhost:3000/emp/insertEmployee', {
      FirstName: this.signupForm.value.userData.fname,
      LastName: this.signupForm.value.userData.lname,
      Email: this.signupForm.value.userData.email,
      Phone: this.signupForm.value.userData.mobile,
      City : this.signupForm.value.userData.city,
      Gender: this.signupForm.value.userData.gender,
      Dept: this.signupForm.value.userData.dept,
      HireDate: this.signupForm.value.userData.hireDate == "" ? "" : this.datePipe.transform( this.signupForm.value.userData.hireDate, 'yyyy-MM-dd'),
      //HireDate: this.signupForm.value.userData.hireDate,
    })
      .subscribe(
        res => {
          console.log(res);
          this.result = 'Registration was Successful...'
          this.dialogRef.close();
        },
        err => {
          console.log('Error occured');
          this.result = ' Registration was not successful'
        }
      );
  }

  
}

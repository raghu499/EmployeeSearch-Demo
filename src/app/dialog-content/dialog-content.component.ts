import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../node_modules/@angular/material';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogContentComponent implements OnInit {

  selected='Dev';

  constructor( public dialogRef: MatDialogRef<DialogContentComponent>,private http: HttpClient) {

   }


  triggerResize(){

  }

  onClose() {
    this.signupForm.reset();
    this.dialogRef.close();
  }
  onClear(){
      this.signupForm.reset();
  }
  result = '';
  countries: string[] = ['Development', 'Testing', 'Marketing'];
  default: string = 'Development';
  productid;


  signupForm: FormGroup;
  //here we are validating the input fields
  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'fname': new FormControl(null, [Validators.required]),
        'lname': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'mobile': new FormControl(null, [Validators.required]),
        'city' : new FormControl(null, [Validators.required]),
        'gender': new FormControl('1'),
        'dep': new FormControl(null),
        'hireDate': new FormControl('')
      }),

    });
  }
  //In this method we will post the data to the target URL with input data.
  onSubmit() {
    //console.log(this.signupForm.value.userData.productid);
    this.http.post('http://172.17.20.19:3000/postProduct', {
      fname: this.signupForm.value.userData.fname,
      lname: this.signupForm.value.userData.lname,
      email: this.signupForm.value.userData.email,
      mobile: this.signupForm.value.userData.mobile
    })
      .subscribe(
        res => {
          console.log(res);
          this.result = 'Registration was Successful'
        },
        err => {
          console.log('Error occured');
          this.result = ' Registration was not successful'
        }
      );
  }

  
}

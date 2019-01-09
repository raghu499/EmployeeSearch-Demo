import { EmployeeService } from './../employee.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fillProperties } from '../../../node_modules/@angular/core/src/util/property';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  signupForm: FormGroup;
  EmployeeDetails: string[];
  rows;
  constructor( private router: Router,private http: HttpClient,private service: EmployeeService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username1': new FormControl(null,Validators.required),
      'password1': new FormControl(null,[Validators.required, Validators.maxLength(20), Validators.minLength(6)])
    });
  }

  onSubmit(usrename1,password1){
  console.log(usrename1);
  console.log(password1);
    this.service.getLoginData(usrename1,password1);
    //this.router.navigateByUrl('/first');
   // console.log("login username",this.signupForm.value.username);
  }
}


import { EmployeeService } from './../employee.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  signupForm: FormGroup;
  EmployeeDetails: string[];
  rows;
  // username1;
  // password1;
  constructor( private location: PlatformLocation,private router: Router,private http: HttpClient,private service: EmployeeService) { }
  
  ngOnInit() {
    this.signupForm = new FormGroup({
      'username1': new FormControl(null,Validators.required),
      'password1': new FormControl(null,[Validators.required, Validators.maxLength(20), Validators.minLength(6)])
      
    });

    // location.onpopstate(() => {
    //   console.log('pressed back in add!!!!!');
      
     
    //   });
  }

  onSubmit(usrename1,password1){
    this.service.getLoginData(usrename1,password1);
    // console.log(this.signupForm.value.username1);
  }

  
}

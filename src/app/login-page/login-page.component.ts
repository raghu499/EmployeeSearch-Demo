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
  constructor( private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'username': new FormControl(null,Validators.required),
      'password': new FormControl(null,[Validators.required, Validators.maxLength(20), Validators.minLength(6)])
    });
  }

  onSubmit(){

    // console.log(signupForm.username)
    this.router.navigateByUrl('/first');
  }
}

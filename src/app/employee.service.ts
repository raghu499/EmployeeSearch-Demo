import { NotificationService } from './notification.service';
import { element } from 'protractor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';
import * as _ from 'lodash';
import { fillProperties } from '../../node_modules/@angular/core/src/util/property';
import { Router } from '../../node_modules/@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
result;
userName;
pwd;

obj;
  constructor(private router: Router,private http: HttpClient,private datePipe: DatePipe,private notificationService: NotificationService) { }
  employeeList: String[];
  rows;

  form: FormGroup = new FormGroup({
    Id: new FormControl(null),
    FirstName: new FormControl('', Validators.required),
    LastName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.email),
    Phone: new FormControl('', Validators.required),
    City: new FormControl(''),
    Gender: new FormControl(''),
    Dept: new FormControl(''),
    HireDate: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      Id: null,
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      City: '',
      Gender: '',
      Dept: '',
      HireDate: ''
    });
  }

  getEmployees() {
    this.http.get('http://172.17.20.19:3000/getProducts')
    .subscribe((response) => {
      this.employeeList = response as string[];
      this.rows = response;
      console.log(this.rows);
    },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occured.');
        } else {
          console.log('Server-side error occured.');
        }
      });
    
      //need to write return  ?
  }

  insertEmployee(employee) {
    this.http.post('http://localhost:3000/emp/insertEmployee', {
      Id:employee.Id,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
      Phone: employee.Phone,
      City : employee.City,
      Gender: employee.Gender,
      Dept: employee.Dept,
      HireDate: employee.HireDate == "" ? "" : this.datePipe.transform( employee.HireDate, 'yyyy-MM-dd'),
    });    
  }


  // need to put the url for update  PUT method / EDIT button
  updateEmployee(employee) {
    
    this.http.put('http://localhost:3000/emp/updateEmployee + employee.Id', {
      Id:employee.Id,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
      Phone: employee.Phone,
      City : employee.City,
      Gender: employee.Gender,
      Dept: employee.Dept,
      HireDate: employee.HireDate == "" ? "" : this.datePipe.transform( employee.HireDate, 'yyyy-MM-dd'),
    });    

   
  }


  deleteEmployee($empid: string) {
    this.http.delete('http://localhost:3000/delete/' + $empid )
    .subscribe(data => { });
  }

  getLoginData(username1,password1) {
    localStorage.setItem('username1',"admin");
    this.http.get('http://localhost:5000/login/loginEmployee/' +username1+  '/' +password1)
     .subscribe(
          (data) => {
          this.obj = data;
      
          this.userName = this.obj.data.username;
          this.pwd = this.obj.data.password;
          localStorage.setItem('username',"admin");

          
          //console.log("dfsdfsdfds",this.obj.data.username);
          //console.log(this.password);
          if (this.userName == username1 && this.pwd == password1) {
          this.router.navigateByUrl('/first');
          this.notificationService.success('::You have been Logged in Successfully...');
          }
          else {
          alert("Please enter correct username and password ");
          }
          },
          err => {
          console.log('Error occured');
          this.notificationService.warn('::Please enter correct username and password...');
          this.router.navigateByUrl('/');
          
          });

  }




  populateForm(employee) {
    // this.form.setValue(_.omit(employee,'departmentName'));
    // this.form.setValue(_.omit(employee,'isDeleted'));
    console.log("in service",employee);
    this.form.setValue = employee

  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DatePipe } from '../../node_modules/@angular/common';
import * as _ from 'lodash';
import { fillProperties } from '../../node_modules/@angular/core/src/util/property';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,private datePipe: DatePipe) { }
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

    this.http.post('http://172.17.20.19:3000/postProduct', {
      fname: employee.value.userData.fname,
      lname: employee.value.userData.lname,
      email: employee.value.userData.email,
      mobile: employee.value.userData.mobile,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
       //hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
      
  }
  // need to put the url for update  PUT method / EDIT button
  updateEmployee(employee) {
    this.http.put(employee.$key,
      {
        fullName: employee.fullName,
        email: employee.email,
        mobile: employee.mobile,
        city: employee.city,
        gender: employee.gender,
        department: employee.department,
        // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
        
      });
  }


  deleteEmployee($empid: string) {
    this.http.delete('http://172.17.20.19:3000/delete/' + $empid )
    .subscribe(data => { });
  }

  populateForm(employee) {
    // this.form.setValue(_.omit(employee,'departmentName'));
    this.form.setValue(_.omit(employee,'isDeleted'));
    console.log(employee);
  }

}

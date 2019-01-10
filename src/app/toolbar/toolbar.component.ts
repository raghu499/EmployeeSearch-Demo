import { EmployeeService } from './../employee.service';
import { LogoutService } from './../logout.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  welcome;
  constructor( private lgoinservice:LogoutService,private router: Router,private service: EmployeeService) { }

  ngOnInit() {
    this.welcome=this.service.userName;
  }

  onLogout(){
localStorage.removeItem('username')
    this.router.navigateByUrl('');
    
    
  }

}

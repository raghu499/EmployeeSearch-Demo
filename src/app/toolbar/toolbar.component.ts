import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }

  onLogout(){
    this.router.navigateByUrl('');
    
  }

}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeBodyComponent } from './employee-body.component';

describe('EmployeeBodyComponent', () => {
  let component: EmployeeBodyComponent;
  let fixture: ComponentFixture<EmployeeBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

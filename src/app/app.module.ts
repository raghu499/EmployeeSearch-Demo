import { LogoutService } from './logout.service';
import { AuthGuard } from './auth.guard';
import { RouterModule } from '@angular/router';
import { NotificationService } from './notification.service';
import { EmployeeService } from './employee.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import {MatTabsModule} from '@angular/material/tabs';
import { MatToolbarModule, MatButtonModule, MatSidenavModule,
   MatIconModule, MatListModule, MatCardModule, MatDialogModule,
   MatFormFieldModule, MatInputModule, MatSelectModule, MatGridListModule, 
    MatDatepickerModule, MatCheckboxModule, MatNativeDateModule, MatRadioModule,
     MatTableModule, MatPaginatorModule, MatSortModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '../../node_modules/@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { EmployeeBodyComponent } from './employee-body/employee-body.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { DatePipe } from '../../node_modules/@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    EmployeeBodyComponent,
    DialogContentComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    RouterModule.forRoot([
      {
        path: '',
        component: LoginPageComponent
       
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
        // children: [
        //   {
        //     path: 'login/first',
        //     component: EmployeeBodyComponent,
        //   },
        // ]}
      {
        path: 'first',
        component: EmployeeBodyComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  entryComponents: [
    DialogContentComponent
  ],
  providers: [DatePipe,EmployeeService,NotificationService,AuthGuard,LogoutService],
  bootstrap: [AppComponent]
})
export class AppModule { }

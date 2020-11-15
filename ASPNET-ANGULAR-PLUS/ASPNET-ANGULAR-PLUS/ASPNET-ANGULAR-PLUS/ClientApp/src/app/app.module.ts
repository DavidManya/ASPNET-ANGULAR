import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeService } from './components/employee/employee.service';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { LogInterceptorService } from './Interceptor/log-interceptor.service';
import { AddressService } from './Components/employee/address/address.service';
import { LeaveFormService } from './Services/leave-form.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EmployeeComponent,
    EmployeeFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'employees', component: EmployeeComponent },
      { path: 'employees-add', component: EmployeeFormComponent, canDeactivate: [LeaveFormService] },
      { path: 'employees-edit/:id', component: EmployeeFormComponent, canDeactivate: [LeaveFormService] },
    ])
  ],
  providers: [EmployeeService,
    AddressService,
    LeaveFormService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

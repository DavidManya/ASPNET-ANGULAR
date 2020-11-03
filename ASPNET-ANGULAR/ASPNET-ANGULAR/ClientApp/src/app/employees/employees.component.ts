import { Component, OnInit } from '@angular/core';
import { IEmployee } from './employee';
import { EmployeesService } from './employees.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit
{

  employees: IEmployee[];

  constructor(private employeesServices: EmployeesService) { }

  ngOnInit()
  {
    this.loadData();
  }

  delete(employee: IEmployee)
  {
    if(confirm('Are you sure you want to delete it?')){
      this.employeesServices.deleteEmployee(employee.idEmployee.toString())
        .subscribe(employee => this.loadData(),
          error => console.error(error));
    }
  }

  loadData()
  {
    this.employeesServices.getEmployees()
      .subscribe(employeesDesdeWS => this.employees = employeesDesdeWS,
        error => console.error(error));
  }
}

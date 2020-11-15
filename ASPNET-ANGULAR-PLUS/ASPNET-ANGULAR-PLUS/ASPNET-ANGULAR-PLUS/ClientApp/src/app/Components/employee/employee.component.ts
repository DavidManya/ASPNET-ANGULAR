import { Component, OnInit } from '@angular/core';
import { IEmployee } from './Employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

    employees: IEmployee[];

    constructor(private employeeService: EmployeeService) { }

    ngOnInit() {
        this.loadData();
    }

    delete(employee: IEmployee) {
        if (confirm('Are you sure you want to delete it?')) {
            this.employeeService.deleteEmployee(employee.employeeId.toString())
                .subscribe(employee => this.loadData(),
                    error => console.error(error));
        }
    }

    loadData() {
        this.employeeService.getEmployees()
            .subscribe(employeesDesdeWS => this.employees = employeesDesdeWS,
                error => console.error(error));
    }

}

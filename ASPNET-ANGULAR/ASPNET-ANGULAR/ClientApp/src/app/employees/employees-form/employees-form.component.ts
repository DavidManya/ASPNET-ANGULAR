import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../employee';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private employeesService: EmployeesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  editMode: boolean = false;
  formGroup: FormGroup;
  employeeId: number;

  ngOnInit()
  {
    this.formGroup = this.fb.group({
      dni: '',
      name: '',
      surnames: '',
      job: '',
      email: '',
      salary: 0
    });

    this.activatedRoute.params.subscribe(params =>
    {
      if (params["id"] == undefined)
      {
        return;
      }

      this.editMode = true;
      this.employeeId = params["id"];
      this.employeesService.getEmployee(this.employeeId.toString())
        .subscribe(employee => this.loadForm(employee),
          error => this.router.navigate(["/employees"]));
    })
  }

  loadForm(employee: IEmployee)
  {
    this.formGroup.patchValue({
      dni: employee.dni,
      name: employee.name,
      surnames: employee.surnames,
      job: employee.job,
      email: employee.email,
      salary: employee.salary
    });
  }

  save()
  {
    let employee: IEmployee = Object.assign({}, this.formGroup.value);
    console.table(employee);

    if (this.editMode)
    {
      employee.idEmployee = Number(this.employeeId);
      console.table(employee);
      this.employeesService.updateEmployee(employee)
        .subscribe(employee => this.onSaveSuccess(),
          error => console.error(error));
    } else
    {
      this.employeesService.createEmployee(employee)
        .subscribe(employee => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  onSaveSuccess()
  {
    this.router.navigate(["/employees"]);
  }

}

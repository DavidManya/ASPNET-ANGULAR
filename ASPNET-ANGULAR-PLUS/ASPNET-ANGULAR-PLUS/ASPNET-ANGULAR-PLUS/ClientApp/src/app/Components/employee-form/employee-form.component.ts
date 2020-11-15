import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../employee/address/address.service';
import { IEmployee } from '../employee/Employee';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private addressService: AddressService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  editMode: boolean = false;
  formGroup: FormGroup;
  employeeId: number;
  addressesToDelete: number[] = [];
  ignorependingchanges: boolean = false;

  pendingChanges(): boolean
  {
    if (this.ignorependingchanges) { return false; };
    return !this.formGroup.pristine;
  }

  ngOnInit()
  {
    this.formGroup = this.fb.group({
      dni: '',
      name: '',
      surnames: '',
      job: '',
      email: '',
      salary: 0,
      addresses: this.fb.array([])
    });

    this.activatedRoute.params.subscribe(params =>
    {
      if (params["id"] == undefined)
      {
        return;
      }

      this.editMode = true;
      this.employeeId = params["id"];
      this.employeeService.getEmployee(this.employeeId.toString())
        .subscribe(employee => this.loadForm(employee),
          error => this.router.navigate(["/employees"]));
    })
  }

  addAddress()
  {
    let addressArr = this.formGroup.get('addresses') as FormArray;
    let addressFG = this.buildAddress();
    addressArr.push(addressFG);
  }

  buildAddress()
  {
    return this.fb.group({
      idAddress: 0,
      streetAddress: '',
      city: '',
      province: '',
      postalCode: '',
      country: '',
      employeeId: Number(this.employeeId != null ? this.employeeId : 0)
    });
  }

  removeAddress(index: number)
  {
    let addresses = this.formGroup.get('addresses') as FormArray;
    let addressRemove = addresses.at(index) as FormGroup;
    if (addressRemove.controls['idAddress'].value != 0)
    {
      this.addressesToDelete.push(<number>addressRemove.controls['idAddress'].value);
    }
    addresses.removeAt(index);
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

    let addresses = this.formGroup.controls['addresses'] as FormArray;
    employee.addresses.forEach(address =>
    {
      let addressFG = this.buildAddress();
      addressFG.patchValue(address);
      addresses.push(addressFG);
    });
  }

  save()
  {
    this.ignorependingchanges = true;
    let employee: IEmployee = Object.assign({}, this.formGroup.value);
    console.table(employee);

    if (this.editMode)
    {
      employee.employeeId = Number(this.employeeId);
      console.table(employee);
      this.employeeService.updateEmployee(employee)
        .subscribe(employee => this.deleteEmployees(),
          error => console.error(error));
    } else
    {
      this.employeeService.createEmployee(employee)
        .subscribe(employee => this.onSaveSuccess(),
          error => console.error(error));
    }
  }

  deleteEmployees()
  {
    if (this.addressesToDelete.length === 0)
    {
      this.onSaveSuccess();
      return;
    }

    this.addressService.deleteAddresses(this.addressesToDelete)
      .subscribe(() => this.onSaveSuccess(),
        error => console.error(error));
  }

  onSaveSuccess()
  {
    this.router.navigate(["/employees"]);
  }

}

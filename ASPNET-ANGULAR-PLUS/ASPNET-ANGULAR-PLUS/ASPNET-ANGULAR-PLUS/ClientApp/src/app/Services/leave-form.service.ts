import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmployeeFormComponent } from '../Components/employee-form/employee-form.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService implements CanDeactivate<EmployeeFormComponent> {

  canDeactivate(component: EmployeeFormComponent): boolean
  {
    if (component.pendingChanges())
    {
      return confirm("There are pending changes. Do you want to leave anyway?");
    }
    return true;
  }

  constructor() { }
}

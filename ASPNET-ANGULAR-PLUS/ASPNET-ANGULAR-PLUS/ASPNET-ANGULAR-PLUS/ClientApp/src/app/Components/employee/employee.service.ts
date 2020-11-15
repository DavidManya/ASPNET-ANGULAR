import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IEmployee } from './employee';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    private apiURL = this.baseUrl + "api/employees";

    constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

    getEmployees(): Observable<IEmployee[]> {
      return this.http.get<IEmployee[]>(this.apiURL);
    }

    getEmployee(employeeId: string): Observable<IEmployee> {
      let params = new HttpParams().set('includeDirections', "true");
      return this.http.get<IEmployee>(this.apiURL + '/' + employeeId, { params: params });
    }

    createEmployee(employee: IEmployee): Observable<IEmployee> {
        return this.http.post<IEmployee>(this.apiURL, employee);
    }

    updateEmployee(employee: IEmployee): Observable<IEmployee> {
        return this.http.put<IEmployee>(this.apiURL + "/" + employee.employeeId.toString(), employee);
    }

    deleteEmployee(employeeId: string): Observable<IEmployee> {
        return this.http.delete<IEmployee>(this.apiURL + "/" + employeeId);
    }
}


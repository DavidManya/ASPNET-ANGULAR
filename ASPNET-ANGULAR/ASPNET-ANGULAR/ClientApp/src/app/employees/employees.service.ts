import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IEmployee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiURL = this.baseUrl + "api/Employees";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEmployees(): Observable<IEmployee[]>
  {
    return this.http.get<IEmployee[]>(this.apiURL);
  }

  getEmployee(idEmployee: string): Observable<IEmployee>
  {
    return this.http.get<IEmployee>(this.apiURL + '/' + idEmployee);
  }

  createEmployee(employee: IEmployee): Observable<IEmployee>
  {
    return this.http.post<IEmployee>(this.apiURL, employee);
  }

  updateEmployee(employee: IEmployee): Observable<IEmployee>
  {
    return this.http.put<IEmployee>(this.apiURL + "/" + employee.idEmployee.toString(), employee);
  }

  deleteEmployee(idEmployee: string): Observable<IEmployee>
  {
    return this.http.delete<IEmployee>(this.apiURL + "/" + idEmployee);
  }
}


import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IUserInfo } from './user-info';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // pass: Aa123456!
  private apiURL = this.baseUrl + "api/account";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  create(userInfo: IUserInfo): Observable<any>
  {
    return this.http.post<any>(this.apiURL + "/Create", userInfo);
  }

  login(userInfo: IUserInfo): Observable<any>
  {
    return this.http.post<any>(this.apiURL + "/Login", userInfo);
  }

  obtenerToken(): string
  {
    return localStorage.getItem("token");
  }

  obtenerExpiracionToken(): string
  {
    return localStorage.getItem("tokenExpiration");
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }

  estaLogueado(): boolean
  {

    var exp = this.obtenerExpiracionToken();

    if (!exp)
    {
      // el token no existe
      return false;
    }

    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime())
    {
      // ya expiró el token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return false;
    } else
    {
      return true;
    }

  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserloginService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/v1';

  private email: string | null = null;
  private token:any;

setEmail(email: string) {
  this.email = email;
}

getEmail(): string | null {
  return this.email;
}

login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
}


sendOtp(email: string): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/otp/generate`,{ email });
}

verifyOtp(data: { email: string, otp: string }): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/otp/verify`, data);
}


signUp(userData: any){
  return this.http.post<any>(`${this.apiUrl}/employee/createEmployee`,userData);
}

addEmployee(empData:any){
  return this.http.post<any>(`${this.apiUrl}/employee/addEmployee`,empData);
}

listEmployee(order: number, limit: number, page: number, payload: any): Observable<any> {
  const url = `${this.apiUrl}/employee/listEmployee?order=${order}&page=${page}`;
  if (typeof window !== 'undefined' && window.localStorage){
  this.token = localStorage.getItem('token');
  console.log('service Token ',this.token);
  }

    if (!this.token) {
      return throwError('No token found in local storage');
    }

    const headers = new HttpHeaders({
      'Authorization': `${this.token}`,
      'Content-Type': 'application/json'
    });
  return this.http.post(url, payload, { headers });
}

}

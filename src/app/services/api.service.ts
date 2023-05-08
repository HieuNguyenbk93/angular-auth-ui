import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = "https://localhost:7262/api/"

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUsers(){
    const url = this.baseUrl + 'User';
    return this.http.get<any>(url);
  }
}

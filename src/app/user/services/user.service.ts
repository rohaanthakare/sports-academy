import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  moduleName = 'user';
  constructor(private http: HttpClient) { }

  registerUser(userData) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/register_user`, userData);
  }
}

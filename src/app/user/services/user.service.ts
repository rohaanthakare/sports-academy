import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  moduleName = 'user';
  constructor(private http: HttpClient, private authService: AuthService) { }

  registerUser(userData) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/register_user`, userData);
  }

  authenticateUser(userData) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/authenticate_user`, userData).pipe(
      map((res: any) => {
      if (res.user) {
        this.authService.setCurrentUser(res.user);
        this.authService.setUserToken(res.token);
      }
      return res;
    }));
  }
}

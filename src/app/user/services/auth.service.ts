import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized = false;
  constructor(private router: Router) { }

  isUserAuthenticated() {
    if (localStorage.getItem('CurrentUser')) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('CurrentUser'));
  }

  setCurrentUser(user) {
    this.isAuthorized = true;
    localStorage.setItem('CurrentUser', JSON.stringify(user));
  }

  getUserToken() {
    return localStorage.getItem('Token');
  }

  setUserToken(token) {
    localStorage.setItem('Token', token);
  }

  logoutUser() {
    this.isAuthorized = false;
    localStorage.clear();
    this.router.navigate(['user/login']);
  }
}

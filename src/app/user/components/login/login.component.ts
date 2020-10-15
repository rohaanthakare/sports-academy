import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  usernameCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required]);
  loginForm: FormGroup = this.formBuilder.group({
    username: this.usernameCtrl,
    password: this.passwordCtrl
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,
    private msgService: MessageService) { }

  ngOnInit(): void {
  }

  authenticateUser() {
    this.submitted = true;
    if(this.loginForm.valid) {
      this.userService.authenticateUser(this.loginForm.value).subscribe(
        (response: any) => {
          this.router.navigate(['home']);
        },
        error => {
          this.msgService.clear();
          this.msgService.add({
            detail: error.error.message,
            severity: 'error'
          });
        }
      );
    }
  }

  navigateToPage(page) {
    this.router.navigate([page]);
  }
}

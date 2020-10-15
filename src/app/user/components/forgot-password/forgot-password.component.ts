import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: this.emailCtrl
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.submitted = true;
  }

  navigateToPage(page) {
    this.router.navigate([page]);
  }

}

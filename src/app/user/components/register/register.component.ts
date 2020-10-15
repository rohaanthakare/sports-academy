import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  usernameCtrl = new FormControl('', [Validators.required]);
  passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPasswordCtrl = new FormControl('', [Validators.required]);
  mobileNoCtrl = new FormControl('', [Validators.required]);
  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  registrationForm: FormGroup = this.formBuilder.group({
    username: this.usernameCtrl,
    password: this.passwordCtrl,
    confirmPassword: this.confirmPasswordCtrl,
    mobileNo: this.mobileNoCtrl,
    email: this.emailCtrl
  }, {
    validators: [this.validatorService.mustMatchValidator('password', 'confirmPassword'),
      this.validatorService.mobileNoValidator('mobileNo')]
  });
  submitted = false;
  constructor(private formBuilder: FormBuilder, private validatorService: ValidatorsService, private userService: UserService,
    private msgService: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.userService.registerUser(this.registrationForm.value).subscribe(
        (response: any) => {
          console.log('Registration success----');
          console.log(response);
          this.msgService.clear();
          this.msgService.add({
            severity: 'success',
            detail: response.message
          });
        },
        error => {
          console.log('Registration error----');
          console.log(error);
          this.msgService.add({
            severity: 'error',
            detail: error.error.message
          });
        }
      );
    }
  }

  navigateToPage(page) {
    this.router.navigate([page]);
  }

}

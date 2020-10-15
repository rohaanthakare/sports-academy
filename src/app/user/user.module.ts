import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// PrimeNg Modules
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

// Components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OtpActivationComponent } from './components/otp-activation/otp-activation.component';
import { LinkActivationComponent } from './components/link-activation/link-activation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeGuardService } from './services/home-guard.service';

const routes: Routes = [{
  path:'login',
  component: LoginComponent,
  canActivate: [HomeGuardService]
}, {
  path:'register',
  component: RegisterComponent
}, {
  path:'forgot-pass',
  component: ForgotPasswordComponent
}, {
  path:'activate-by-otp',
  component: OtpActivationComponent
}, {
  path:'activate-by-email',
  component: LinkActivationComponent
}];
@NgModule({
  declarations: [LoginComponent, RegisterComponent, OtpActivationComponent, LinkActivationComponent,
    ForgotPasswordComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule,
    InputTextModule, PasswordModule, ButtonModule, InputNumberModule, MessagesModule, MessageModule
  ]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import {PasswordModule} from 'primeng/password';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from 'primeng/toast';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, PasswordModule, FormsModule, ReactiveFormsModule, ToastModule],

})
export class AuthModule {}

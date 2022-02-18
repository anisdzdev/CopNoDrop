import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import {PasswordModule} from 'primeng/password';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {HomeRoutingModule} from "../home/home-routing.module";
import {InputSwitchModule} from "primeng/inputswitch";

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [CommonModule, AuthRoutingModule, PasswordModule, FormsModule, ReactiveFormsModule, ToastModule, InputTextModule, ButtonModule, HomeRoutingModule, InputSwitchModule],

})
export class AuthModule {}

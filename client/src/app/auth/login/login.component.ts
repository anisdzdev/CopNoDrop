import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  value3: any;

  @Input() error: string | null;

  constructor(private loginService: LoginService) { }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit(): void {
    this.loginService.login(this.form.value.username, this.form.value.password).subscribe(error => {
      this.error = error;
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
})
export default class AuthSigninComponent {
  private objUser: any = {};
  public loginForm: any;

  constructor(
    private authService: AuthServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      user: '',
      pass: '',
    });
  }

  public saveTokenToLocalStorage(token: string) {
    localStorage.setItem('authToken', token);
  }

  public getTokenFromLocalStorage(): string | null {
    return localStorage.getItem('authToken');
  }

  public removeTokenFromLocalStorage() {
    localStorage.removeItem('authToken');
  }

  public login() {
    const formValues = this.loginForm.value;
    this.objUser = {
      username: formValues.user,
      password: formValues.pass,
    };

    this.authService.login(this.objUser).subscribe((data) => {
      this.saveTokenToLocalStorage(data.token_acceso);
      this.router.navigate(['/dashboard']);
    });
  }
}

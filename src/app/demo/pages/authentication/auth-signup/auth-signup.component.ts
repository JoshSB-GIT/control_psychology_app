import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from 'src/app/services/authServices/auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
})
export default class AuthSignupComponent {
  constructor(private authService: AuthServiceService) {}

  private user: any = {};

  public login() {
    this.authService.login(this.user).subscribe((data) => {
      console.log(data);
    });
  }
}

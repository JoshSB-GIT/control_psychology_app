import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const accessToken = localStorage.getItem('authToken');

    if (accessToken) {
      console.log('TRUE');
      return true;
    }

    console.log('FALSE');
    this.router.navigate(['/auth/signin']);
    return false;
  }
}

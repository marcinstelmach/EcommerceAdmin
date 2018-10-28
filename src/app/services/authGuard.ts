import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router'; 
import { AuthService } from 'app/services/auth/auth.service';

@Injectable()
export class AuthGuard implements  CanActivate {
  constructor (private router: Router, private authService: AuthService) {}

  canActivate() {
    if(!this.authService.isTokenExpired()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

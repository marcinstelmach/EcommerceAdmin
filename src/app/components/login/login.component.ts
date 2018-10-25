import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/userService';
import {UserForLogin, UserLoginResponseFromApi} from '../../models/userForLogin';
import {HttpErrorResponse} from '@angular/common/http';  
import {Router} from '@angular/router';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserForLogin;
  token: UserLoginResponseFromApi;
  errors: any;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    this.user = this.loginForm.value;
    this.authService.login(this.user).subscribe(
      data => {
        console.log(data);
        this.token = data;
        this.authService.setToken(data);
        this.router.navigate(['/charm']);
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/userService';
import {UserForLogin} from '../../models/userForLogin';
import {HttpErrorResponse} from '@angular/common/http';
import {TokenModel} from '../../models/tokenModel';
import {AuthService} from '../../services/authService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: UserForLogin;
  token: TokenModel;
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
    this.user = <UserForLogin> this.loginForm.value;
    this.userService.login(this.user).subscribe(
      data => {
        this.token = data.body;
        this.authService.setToken(this.token);
        this.router.navigate(['/charm']);
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }
}

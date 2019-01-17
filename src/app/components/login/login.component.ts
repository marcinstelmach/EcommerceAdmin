import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error: any;

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
    const userCredentials = this.loginForm.value;
    this.authService.login(userCredentials.email, userCredentials.password).subscribe(
      data => {
        this.authService.setToken(data);
        this.router.navigate(['/orders']);
      }
    );
  }
}

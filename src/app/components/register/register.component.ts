import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordValidation} from '../../services/PasswordValidation';
import {UserForCreation} from '../../models/userForCreation';
import {UserService} from '../../services/userService';
import {UserForDisplay} from '../../models/userForDisplay';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: UserForCreation;
  showModal = false;
  userForDisplay: UserForDisplay;
  errors: any;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registerForm = this.fb.group({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required]),
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('', [Validators.required])
    }, {
      validator: PasswordValidation.matchPassword
    });
  }

  register() {
    this.user = <UserForCreation> this.registerForm.value;
    this.userService.register(this.user).subscribe(
      data => {
        this.userForDisplay = data.body;
        this.showModal = true;
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }

  hideModal() {
    this.showModal = false;
    this.router.navigate(['/login']);
  }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../services/customValidators';

import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showModal = false;
  errors: any;

  constructor(private fb: FormBuilder, private userService: UserService) {

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
      validator: CustomValidators.matchPassword
    });
  }

  register(): void {
    const user = this.registerForm.value;
    this.userService.register(user).subscribe(
      data => {
        if (data instanceof Error) {

        } else {
          this.showModal = true;
        }
      }
    );
  }

  hideModal(): void {
    this.showModal = false;
  }

}

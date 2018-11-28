import {AbstractControl} from '@angular/forms';

export class CustomValidators {
  static matchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('confirmPassword').value;
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({matchPassword: true});
    } else {
      return null;
    }
  }

  static checkDateRange(AC: AbstractControl) {
    const dataFrom = AC.get('availableFrom').value;
    console.log(dataFrom);
    const dataTo = AC.get('availableTo').value;
    console.log(dataTo);
  }
}

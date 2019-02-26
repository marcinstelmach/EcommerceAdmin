import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {StreetwoodError} from '../../../models/error.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
})
export class ErrorModalComponent implements OnInit {
  error: StreetwoodError;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
    let errorCodeName = '';
    if (this.data.error !== null) {
      errorCodeName = this.data.error.errorCodeName;
    } else {
      errorCodeName = this.data.statusText;
    }
    let message = '';
    if (this.data.error !== null) {
      message = this.data.error.message;
    }

    this.error = {
      errorCodeName: errorCodeName,
      message: message,
      status: this.data.status,
      exception: this.data
    } as StreetwoodError;
  }
}

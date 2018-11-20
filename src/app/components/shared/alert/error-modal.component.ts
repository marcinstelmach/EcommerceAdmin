import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import {StreetwoodError} from '../../../models/error.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
})
export class ErrorModalComponent implements OnInit {
  error: StreetwoodError;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.error = this.data;
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.css']
})
export class DeleteAlertComponent implements OnInit {
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.title = 'Are You sure You want to delete';

    if (this.data['title'] !== undefined) {
      this.title = this.data['title'];
    } else if (this.data['name'] !== undefined) {
      this.title += ` ${this.data['name']}?`;
    } else {
      this.title += '?';
    }
  }

}

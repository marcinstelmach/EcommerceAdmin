import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {DeleteAlertComponent} from '../../shared/delete-alert/delete-alert.component';
import {CharmService} from '../../../services/charm/charm.service';
import {Charm} from '../../../models/charm.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.charm.component.html',
  styleUrls: ['./edit.charm.component.css']
})
export class EditCharmComponent implements OnInit {
  charmEditForm: FormGroup;
  contentHost = environment.contentHost;

  constructor(@Inject(MAT_DIALOG_DATA) public charm: Charm,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private charmService: CharmService) {
  }

  ngOnInit() {
    this.createForm();
  }

  editCharm() {
    const data = this.charmEditForm.value;
    this.charmService.updateCharm(this.charm.id, data).subscribe();
  }

  createForm() {
    this.charmEditForm = this.fb.group({
      'name': new FormControl(this.charm.name, [Validators.required]),
      'nameEng': new FormControl(this.charm.nameEng, [Validators.required]),
      'price': new FormControl(this.charm.price, [Validators.required, Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),
    });
  }

  openRemoveModal() {
    this.dialog.open(DeleteAlertComponent, {
      data: {title: 'Are you sure, you want to remove this charm?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.charmService.deleteCharm(this.charm.id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {VersionForDisplay} from '../../models/versionForDisplay';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {VersionService} from '../../services/versionService';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  emptyFolder = '../assets/img/folder.png';
  fullFolder = '../assets/img/fullFolder.png';
  versions: VersionForDisplay[];
  versionForm: FormGroup;
  errors: any;
  repositoryId: string;
  showConflictModal = false;
  basedVersionId: string;

  constructor(private versionService: VersionService, private fb: FormBuilder, private router: Router) {
    const splitedUrl = this.router.url.split('/');
    this.repositoryId = splitedUrl[2];
  }

  ngOnInit() {
    this.basedVersionId = null;
    this.getVersions();
    this.createForm();
  }

  getVersions() {
    this.versionService.getVersionsForUser(this.repositoryId).subscribe(data => {
      this.versions = data.body;
    });
  }

  createForm() {
    this.versionForm = this.fb.group({
      'name': new FormControl('', [Validators.minLength(3), Validators.required, Validators.maxLength(30)]),
      'description': new FormControl('', [Validators.minLength(3), Validators.required, Validators.maxLength(30)])
    });
  }

  addVersion() {
    const data = this.versionForm.value;
    this.versionService.addVersionForUser(data, this.repositoryId).subscribe(resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }

  deleteVersion(versionId: string) {
    this.versionService.deleteVersionForUser(versionId, this.repositoryId).subscribe(
      resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  changeVersionStatus(versionId: string) {
    this.versionService.changeVersionStatus(versionId, this.repositoryId).subscribe(
      resp => {
        if (resp.status === 200) {
          this.ngOnInit();
        } else if (resp.status === 409) {
          this.showConflictModal = true;
          console.log('conflict');
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }

  setBasedVersion(versionId: string) {
    this.basedVersionId = versionId;
  }

  addBasedVersion() {
    const data = this.versionForm.value;
    this.versionService.addBasedVersion(data, this.repositoryId, this.basedVersionId).subscribe(resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }

}

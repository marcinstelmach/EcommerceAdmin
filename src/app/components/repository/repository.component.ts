import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {RepositoryForDisplay} from '../../models/repositoryForDisplay';
import {RepositoryService} from '../../services/repositoryService';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RepositoryComponent implements OnInit {
  emptyFolder = '../assets/img/folder.png';
  fullFolder = '../assets/img/fullFolder.png';
  repositories: RepositoryForDisplay[];
  repositoryForm: FormGroup;
  errors: any;

  constructor(private repositoryService: RepositoryService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getRepositories();
    this.createForm();
  }

  getRepositories() {
    this.repositoryService.getRepositoriesForUser().subscribe(data => {
      this.repositories = data.body;
    });
  }

  createForm() {
    this.repositoryForm = this.fb.group({
      'name': new FormControl('', [Validators.minLength(3), Validators.required, Validators.maxLength(30)])
    });
  }

  addRepository() {
    const data = this.repositoryForm.value;
    this.repositoryService.addRepositoryForUser(data).subscribe(resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(this.errors);
      }
    );
  }

  deleteRepository(repositoryId: string) {
    this.repositoryService.deleteRepositoryForUser(repositoryId).subscribe(
      resp => {
        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        console.log(err.error);
      }
    );
  }
}

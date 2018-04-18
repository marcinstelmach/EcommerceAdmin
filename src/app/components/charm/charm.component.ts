import {Component, EventEmitter, OnInit} from '@angular/core';
import {CharmService} from '../../services/charmService';
import {CharmCategoryForDisplay} from '../../models/charmCategoryForDisplay';
import {CharmCategoryWithCharms} from '../../models/charmCategoryWithCharms';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CharmCategoryService} from '../../services/charmCategoryService';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';
import {CharmForCreation} from '../../models/charmForCreation';
import {AuthService} from '../../services/authService';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-charm',
  templateUrl: './charm.component.html',
  styleUrls: ['./charm.component.css']
})
export class CharmComponent implements OnInit {
  categories: CharmCategoryForDisplay[];
  categoriesWithCharms: CharmCategoryWithCharms[];
  charmForm: FormGroup;
  options: UploaderOptions;
  charmForAdd: CharmForCreation;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  pathToCharm: string;
  url: string;
  uploadSuccessAlert = false;
  uploadFailAlert = false;
  currentCharmId: number;


  constructor(private charmService: CharmService,
              private fb: FormBuilder,
              private charmCategoryService: CharmCategoryService,
              private authService: AuthService) {

    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.pathToCharm = environment.charms;
    this.url = environment.API_URL;
    this.getCategories();
    this.getCategoriesWithCharms();
    this.createForm();
  }


  createForm() {
    this.charmForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'price': new FormControl('5', Validators.required),
      'type': new FormControl(0, Validators.required),
      'charmCategoryId': new FormControl('', Validators.required)
    });

  }

  getCategories() {
    this.charmCategoryService.getCategories().subscribe(resp => {
        this.categories = resp.body;
        this.charmForm.controls['charmCategoryId'].setValue(this.categories[0].id);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  getCategoriesWithCharms() {
    this.charmCategoryService.getCategoriesWithCharms().subscribe(resp => {
        this.categoriesWithCharms = resp.body;
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  addCharm() {
    this.charmForAdd = this.charmForm.value;
    this.charmForAdd.imageExtension = this.getFileExtension(this.files[0].name);
    this.charmService.addCharm(this.charmForAdd).subscribe(resp => {
      const categoryName = this.categories.find(s => s.id == this.charmForAdd.charmCategoryId).name;
      this.startUpload(categoryName, resp.body.uniqueName);
      this.uploadSuccessAlert = false;
    }, (err: HttpErrorResponse) => {
      this.uploadFailAlert = true;
    });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected') {
      this.uploadFailAlert = true;
    }
    if (output.type === 'done') {
      this.charmForm.reset();
      this.getCategoriesWithCharms();
      this.uploadSuccessAlert = true;
    }
  }

  startUpload(categoryName: string, uniqueName: string): void {
    const token = this.authService.getToken();
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.url + '/charms/' + categoryName + '/' + uniqueName + '/',
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      data: {foo: 'bar'}
    };

    this.uploadInput.emit(event);
  }

  deleteCharmModal(charmId: number) {
    this.currentCharmId = charmId;
  }

  deleteCharm() {
    this.charmService.deleteCharm(this.currentCharmId).subscribe(resp => {
      if (resp.ok) {
        this.getCategoriesWithCharms();
        return;
      }
      console.log('Cannot delete this charm :(');
    });
  }

  private getFileExtension(fileName: string): string {
    const index = fileName.indexOf('.');
    return fileName.substr(index);
  }
}

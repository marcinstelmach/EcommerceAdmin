import {CharmService} from '../../services/charm/charm.service';
import {Component, EventEmitter, OnInit} from '@angular/core';
import {CharmCategory} from '../../models/charm-category.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';
import {environment} from '../../../environments/environment';
import {CharmCategoriesService} from '../../services/charm-categories/charm-categories.service';
import {AuthService} from '../../services/auth/auth.service';


@Component({
  selector: 'app-charm',
  templateUrl: './charm.component.html',
  styleUrls: ['./charm.component.css']
})
export class CharmComponent implements OnInit {
  categories: CharmCategory[];
  charmForm: FormGroup;
  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  pathToCharm: string;
  url: string;
  errors: any;
  uploadSuccessAlert = false;
  uploadFailAlert = false;
  currentCharmId: number;
  charmId: string;


  constructor(private charmService: CharmService,
              private fb: FormBuilder,
              private charmCategoryService: CharmCategoriesService,
              private authService: AuthService) {

    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.pathToCharm = environment.backendPath;
    // this.url = environment.API_URL;
    this.getCategories();
    this.getCategoriesWithCharms();
    this.createForm();
  }


  createForm() {
    this.charmForm = this.fb.group({
      'name': new FormControl('', Validators.required),
      'nameEng': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),
      'charmCategoryId': new FormControl('', Validators.required)
    });
  }

  getCategories() {
    this.charmCategoryService.getCategories().subscribe(resp => {
      this.categories = resp;
    });
  }

  getCategoriesWithCharms() {
    // this.charmCategoryService.getCategoriesWithCharms().subscribe(resp => {
    //     this.categoriesWithCharms = resp.body;
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   });
  }

  addCharm() {
    this.charmService.addCharm(this.charmForm.value).subscribe(response => {
      this.charmId = response;
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
      this.ngOnInit();
      this.uploadSuccessAlert = true;
    }
  }

  startUpload(): void {
    console.log('Upload');
    // const token = this.authService.getToken();
    // const event: UploadInput = {
    //   type: 'uploadAll',
    //   url: this.url + '/charms/all',
    //   method: 'POST',
    //   headers: {'Authorization': 'Bearer ' + token, 'Accept': '/', 'Access-Control-Allow-Origin': 'http://localhost:4200'},
    //   data: {
    //     name: this.charmForAdd.name,
    //     price: this.charmForAdd.price.toString(),
    //     type: this.charmForAdd.type.toString(),
    //     charmCategoryId: this.charmForAdd.charmCategoryId.toString(),
    //     imageExtension: this.charmForAdd.imageExtension
    //   }
    // };

    // this.uploadInput.emit(event);
  }

  deleteCharmModal(charmId: number) {
    this.currentCharmId = charmId;
  }

  deleteCharm(id: number) {
    // this.charmService.deleteCharm(this.currentCharmId).subscribe(resp => {
    //   if (resp.ok) {
    //     this.getCategoriesWithCharms();
    //     return;
    //   }
    //   console.log('Cannot delete this charm :(');
    // });
  }

  private getFileExtension(fileName: string): string {
    const index = fileName.indexOf('.');
    return fileName.substr(index);
  }
}

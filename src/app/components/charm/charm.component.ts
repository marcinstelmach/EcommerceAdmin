import {CharmService} from '../../services/charm/charm.service';
import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {CharmCategory} from '../../models/charm-category.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UploaderOptions, UploadFile, UploadInput, UploadOutput} from 'ngx-uploader';
import {CharmCategoriesService} from '../../services/charm-categories/charm-categories.service';
import {AuthService} from '../../services/auth/auth.service';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Charm} from '../../models/charm.interface';
import {EditCharmComponent} from './edit/edit.charm.component';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-charm',
  templateUrl: './charm.component.html',
  styleUrls: ['./charm.component.css']
})
export class CharmComponent implements OnInit {
  categories: CharmCategory[];
  charms: Charm[];
  charmsTable: any;
  charmsTableColumns: string[] = ['position', 'name', 'price', 'new'];
  charmForm: FormGroup;
  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  progress = 0;
  showProgressBar = false;
  url: string;
  errors: any;
  charmId: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rememberForm = false;
  currentCategory = '';


  constructor(private charmService: CharmService,
              private fb: FormBuilder,
              private charmCategoryService: CharmCategoriesService,
              private authService: AuthService,
              private addedAlert: MatSnackBar,
              private dialog: MatDialog) {

    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
    this.getCategories();
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

  addCharm() {
    this.charmService.addCharm(this.charmForm.value).subscribe(response => {
      this.charmId = response;
      this.startUpload();
    });
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      this.countProgress();
    } else if (output.type === 'allAddedToQueue') {
      this.showProgressBar = true;
    }
    if (output.type === 'done') {
      this.countProgress();
      if (this.progress === 100) {
        this.getCategories();

        if (!this.rememberForm) {
          this.charmForm.reset();
        }
        this.showProgressBar = false;
        this.addedAlert.open('Added successfully !', 'Close', {
          duration: 2000
        });
        if (this.currentCategory !== '') {
          this.selectCategory(this.currentCategory);
        }
      }
    }
  }

  startUpload(): void {
    const token = this.authService.getToken();
    const event: UploadInput = {
      type: 'uploadAll',
      url: `${environment.backendPath}/api/charms/${this.charmId}/image`,
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      data: {}
    };

    this.uploadInput.emit(event);
  }

  countProgress(): void {
    const max = this.files.length * 100;
    let current = 0;
    for (const file of this.files) {
      current += file.progress.data.percentage;
    }
    this.progress = ((current * 100) / max);
  }

  buildTable(data: Charm[]) {
    this.charmsTable = new MatTableDataSource<Charm>(data);
    this.charmsTable.paginator = this.paginator;
  }

  selectCategory(id: string) {
    this.currentCategory = id;
    this.charms = this.categories.find(s => s.id === id).charms;
    this.buildTable(this.charms);
  }

  openEditModal(charm: Charm) {
    this.dialog.open(EditCharmComponent, {
      minWidth: '60%',
      maxHeight: '80%',
      position: {right: '10px'},
      data: charm
    }).afterClosed().subscribe(result => {
      this.getCategories();
      if (this.currentCategory !== '') {
        this.selectCategory(this.currentCategory);
      }
    });
  }

  createSimilar(charm: Charm) {
    this.charmForm.controls['name'].setValue(charm.name);
    this.charmForm.controls['nameEng'].setValue(charm.nameEng);
    this.charmForm.controls['price'].setValue(charm.price);
  }
}

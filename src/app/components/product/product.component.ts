import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput} from 'ngx-uploader';
import {UploadOutput} from 'ngx-uploader/index';
import {environment} from '../../../environments/environment';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {AuthService} from 'app/services/auth/auth.service';
import {ProductsService} from '../../services/products/products.service';
import {ProductCategory} from '../../models/product-category.interface';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  categories: ProductCategory[];
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  url: string;
  productId: number;
  progress = 0;
  showProgressBar = false;
  howMuch100 = 0;

  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService,
              private authService: AuthService,
              private productService: ProductsService,
              private snackBar: MatSnackBar) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.url = environment.API_URL;
  }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.productForm = this.fb.group({
      'name': new FormControl('name', [Validators.required]),
      'nameEng': new FormControl('engName', [Validators.required]),
      'description': new FormControl('desc', Validators.required),
      'descriptionEng': new FormControl('desc', Validators.required),
      'price': new FormControl('15', [Validators.required, Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),
      'acceptCharms': new FormControl(false),
      'sizes': new FormControl('s, m, l, xl'),
      'productCategoryId': new FormControl('', Validators.required)
    });
  }

  getCategories() {
    this.categoryService.fetchProductCategories().subscribe(resp => {
      this.categories = resp;
    });
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value).subscribe(resp => {
      this.productId = resp;
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
        this.productForm.reset();
        this.uploadInput = null;
        this.showProgressBar = false;
        this.snackBar.open('Added successfully !', 'Close', {
          duration: 2000
        });
      }
    }
  }

  startUpload(): void {
    const token = this.authService.getToken();
    const event: UploadInput = {
      type: 'uploadAll',
      url: '/api/images/' + this.productId + '/false',
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
}

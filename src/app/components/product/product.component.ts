import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput} from 'ngx-uploader';
import {UploadOutput} from 'ngx-uploader/index';
import {environment} from '../../../environments/environment';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {AuthService} from 'app/services/auth/auth.service';
import {ProductsService} from '../../services/products/products.service';
import {ProductCategory} from '../../models/product-category.interface';

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
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  url: string;
  uploadSuccessAlert = false;
  uploadFailAlert = false;
  productId = 6;

  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService,
              private authService: AuthService,
              private productService: ProductsService) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
    this.url = environment.API_URL;
  }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.productForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'nameEng': new FormControl('', [Validators.required]),
      'description': new FormControl('', Validators.required),
      'descriptionEng': new FormControl('', Validators.required),
      'price': new FormControl('', [Validators.required, Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),
      'acceptCharms': new FormControl(true, Validators.required),
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
      this.uploadSuccessAlert = false;
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
      this.productForm.reset();
      this.uploadSuccessAlert = true;
      this.uploadFailAlert = false;
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
}

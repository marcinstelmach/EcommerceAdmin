import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCategoryForCreation} from '../../models/productCategoryForCreation';
import {ProductCategoryForDisplay} from '../../models/productCategoryForDisplay';
import {ProductCategoryService} from '../../services/productCategoryService';
import {HttpErrorResponse} from '@angular/common/http';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput} from 'ngx-uploader';
import {GlobalService} from '../../services/globalService';
import {UploadOutput} from 'ngx-uploader/index';
import {AuthService} from '../../services/authService';
import {ProductService} from '../../services/productService';
import {ProductForCreation} from '../../models/productForCreation';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  productForAdd: ProductForCreation;
  categories: ProductCategoryForDisplay[];
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  url: string;
  uploadSuccessAlert = false;
  uploadFailAlert = false;

  constructor(private fb: FormBuilder,
              private categoryService: ProductCategoryService,
              private globalService: GlobalService,
              private authService: AuthService,
              private productService: ProductService) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.url = this.globalService.servicePath;
  }

  ngOnInit() {
    this.createForm();
    this.getCategories();
  }

  createForm() {
    this.productForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'price': new FormControl('', Validators.required),
      'categoryId': new FormControl('', Validators.required),
      'status': new FormControl(0, Validators.required),
      'description': new FormControl('', Validators.required),
      'hasCharms': new FormControl(0, Validators.required),
      'colors': new FormControl('czarny, biały'),
      'sizes': new FormControl('s, m, l, xl')
    });
  }

  getCategories() {
    this.categoryService.getChildCategories().subscribe(resp => {
        this.categories = resp.body;
        this.productForm.controls['categoryId'].setValue(this.categories[0].id);
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }

  addProduct() {
    this.productForAdd = this.productForm.value;
    // this.productService.addProduct(this.productForAdd).subscribe(resp => {
    //   this.startUpload(resp.body.id);
    //   this.uploadSuccessAlert = false;
    // }, (err: HttpErrorResponse) => {
    //   this.uploadFailAlert = true;
    // });
    console.log(this.productForAdd);
    console.log(this.files);
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

  startUpload(productId: number): void {
    const token = this.authService.getToken();
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.url + '/products/' + productId + '/',
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      data: {foo: 'bar'}
    };

    this.uploadInput.emit(event);
  }

}

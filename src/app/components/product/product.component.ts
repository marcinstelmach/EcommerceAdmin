import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCategoryForDisplay} from '../../models/productCategoryForDisplay';
import {HttpErrorResponse} from '@angular/common/http';
import {humanizeBytes, UploaderOptions, UploadFile, UploadInput} from 'ngx-uploader';
import {UploadOutput} from 'ngx-uploader/index';
import {ProductForCreation} from '../../models/productForCreation';
import {environment} from '../../../environments/environment';
import { ProductsCategoriesService } from '../../services/products-categories/products-categories.service';
import { AuthService } from 'app/services/auth/auth.service';
import { ProductsService } from '../../services/products/products.service';

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
      'price': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'descriptionEng': new FormControl(0, Validators.required),
      'acceptCharms': new FormControl(true, Validators.required),
      'hasCharms': new FormControl(0, Validators.required), 
      'productCategoryId': new FormControl('', Validators.required), 
      'sizes': new FormControl('s, m, l, xl')
    });
  }

  getCategories() {
    // this.categoryService.getChildCategories().subscribe(resp => {
    //     this.categories = resp.body;
    //     this.productForm.controls['categoryId'].setValue(this.categories[0].id);
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   });
  }
  // wysylac zdjecie i produkt w jednym
  addProduct() {
    this.productForAdd = this.productForm.value;
    // this.productService.addProduct(this.productForAdd).subscribe(resp => {
    //   this.startUpload(resp.body.id);
    //   this.uploadSuccessAlert = false;
    // }, (err: HttpErrorResponse) => {
    //   this.uploadFailAlert = true;
    // });
    this.startUpload();
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
      url: this.url + '/products/all',
      method: 'POST',
      headers: {'Authorization': 'Bearer ' + token},
      data: {
        name: this.productForAdd.name,
        price: this.productForAdd.price.toString(),
        categoryId: this.productForAdd.categoryId.toString(),
        status: this.productForAdd.status.toString(),
        description: this.productForAdd.description,
        hasCharms: this.productForAdd.hasCharms.toString(),
        colors: this.productForAdd.colors,
        sizes: this.productForAdd.sizes
      }
    };

    this.uploadInput.emit(event);
  }

}

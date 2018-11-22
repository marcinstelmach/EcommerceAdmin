import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadFile, UploadInput} from 'ngx-uploader';
import {UploadOutput} from 'ngx-uploader/index';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {AuthService} from 'app/services/auth/auth.service';
import {ProductsService} from '../../services/products/products.service';
import {ProductCategory} from '../../models/product-category.interface';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Product} from '../../models/product.interface';
import {EditProductComponent} from './edit/edit.product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  productTableColumns: string[] = ['position', 'name', 'description', 'price'];
  categories: ProductCategory[];
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  productId: number;
  progress = 0;
  showProgressBar = false;
  products: Product[];
  productsTable: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService,
              private authService: AuthService,
              private productService: ProductsService,
              private addedAlert: MatSnackBar,
              private dialog: MatDialog) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
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
      'acceptCharms': new FormControl(false),
      'sizes': new FormControl('s, m, l, xl'),
      'productCategoryId': new FormControl('', Validators.required)
    });
  }

  getCategories() {
    this.categoryService.fetchProductCategories().subscribe((resp: ProductCategory[]) => {
      this.categories = resp.reduce((a, b) => [...a, ...b.productCategories], []);
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
        this.showProgressBar = false;
        this.addedAlert.open('Added successfully !', 'Close', {
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

  buildTable(data: Product[]) {
    this.productsTable = new MatTableDataSource<Product>(data);
    this.productsTable.paginator = this.paginator;
  }

  selectCategory(id: string) {
    this.productService.getPropductsByCategoryId(id).subscribe(data => {
      this.products = data;
      for (let product of  this.products) {
        product.productCategoryId = id;
      }
      this.buildTable(data);
    });
  }

  openEditModal(product: Product) {
    this.dialog.open(EditProductComponent, {
      minWidth: '60%',
      maxHeight: '80%',
      position: {right: '10px'},
      data: product
    });
  }
}

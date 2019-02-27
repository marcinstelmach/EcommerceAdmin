import {Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UploadFile, UploadInput} from 'ngx-uploader';
import {UploadOutput} from 'ngx-uploader/index';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {ProductsService} from '../../services/products/products.service';
import {ProductCategory} from '../../models/product-category.interface';
import {MatDialog, MatPaginator, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Product} from '../../models/product.interface';
import {EditProductComponent} from './edit/edit.product.component';
import {AuthService} from '../../services/auth/auth.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productForm: FormGroup;
  productsTable: any;
  productsTableColumns: string[] = ['position', 'name', 'description', 'price', 'new'];
  categories: ProductCategory[];
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  productId: number;
  progress = 0;
  showProgressBar = false;
  products: Product[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  rememberForm = false;


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
      'acceptCharms': new FormControl(true),
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
    if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
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
        if (!this.rememberForm) {
          this.productForm.reset();
        }

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
      url: `${environment.backendPath}/api/images/${this.productId}/false`,
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

  createSimilar(product: Product) {
    this.productForm.controls['name'].setValue(product.name);
    this.productForm.controls['nameEng'].setValue(product.nameEng);
    this.productForm.controls['description'].setValue(product.description);
    this.productForm.controls['descriptionEng'].setValue(product.descriptionEng);
    this.productForm.controls['price'].setValue(product.price);
    this.productForm.controls['acceptCharms'].setValue(product.acceptCharms);
    this.productForm.controls['sizes'].setValue(product.sizes);
    this.productForm.controls['productCategoryId'].setValue(product.productCategoryId);
  }
}

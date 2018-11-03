import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {ProductCategory} from '../../models/product-category.interface';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  errors: any;
  categories: ProductCategory[];
  treeError = false;

  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService) {
  }

  ngOnInit() {
    this.getCategories();
    this.createMainForm();
  }

  createMainForm() {
    this.categoryForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'nameEng': new FormControl('', [Validators.required]),
      'productCategoryId': new FormControl('')
    });
  }

  addCategory() {
    const data = this.categoryForm.value;
    console.log(data);
    this.categoryService.addProductCategory(data).subscribe(resp => {
        this.categoryForm.reset();
        this.getCategories();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(err);
      });
  }

  getCategories() {
    this.categoryService.fetchProductCategories().subscribe(resp => {
        this.categories = resp;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.treeError = true;
      });
  }

  deleteCategoryModal(categoryId: string) {
    // this.currentCategoryId = categoryId;
  }

  deleteCategory() {
    // this.categoryService.deleteCategory(this.currentCategoryId).subscribe(resp => {
    //     this.currentCategoryId = null;
    //     this.getCategories();
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   });
  }
}

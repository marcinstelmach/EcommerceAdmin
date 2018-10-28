import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCategoryForCreation} from '../../models/productCategoryForCreation';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductCategoryTreeForDisplay} from '../../models/productCategoryTreeForDisplay';
import {ProductCategoryForDisplay} from '../../models/productCategoryForDisplay';
import { ProductsCategoriesService } from '../../services/products-categories/products-categories.service';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  subCategoryForm: FormGroup;
  categoryForCreation: any;
  errors: any;
  categoriesTree: ProductCategoryTreeForDisplay[];
  treeError = false;
  currentCategoryId: number;
  parentCategories: ProductCategoryForDisplay[];

  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService) {
  }

  ngOnInit() {
    this.createSubCategoryForm();
    this.getCategoriesTree();
    this.createMainForm();
    this.getParentCategories();
  }

  createMainForm() {
    // this.categoryForm = this.fb.group({
    //   'name': new FormControl('', [Validators.required]),
    //   'isPremium': new FormControl(false)
    // });

    this.categoryForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'nameEng': new FormControl('', [Validators.required]),
      'productCategoryId': new FormControl('', [Validators.required]) 
    });
  }

  createSubCategoryForm() {
    this.subCategoryForm = this.fb.group({
      'parentId': new FormControl('', [Validators.required]),
      'name': new FormControl('', [Validators.required]),
      'isPremium': new FormControl(false)
    });
  }

  addCategory() {
    this.categoryForCreation = this.categoryForm.value;
    this.categoryForCreation.parentId = null;
    this.categoryService.addProductCategory(this.categoryForCreation).subscribe(resp => {
        this.getCategoriesTree();
        this.getParentCategories();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(err);
      });
  }

  getCategoriesTree() {
    // this.categoryService.getCategoriesTree().subscribe(resp => {
    //     this.categoriesTree = resp.body;
    //   },
    //   (err: HttpErrorResponse) => {
    //     this.treeError = true;
    //   });
  }

  deleteCategoryModal(categoryId: number) {
    this.currentCategoryId = categoryId;
  }

  deleteCategory() {
    // this.categoryService.deleteCategory(this.currentCategoryId).subscribe(resp => {
    //     this.currentCategoryId = null;
    //     this.getCategoriesTree();
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   });
  }

  getParentCategories() {
    // this.categoryService.getParentCategories().subscribe(resp => {
    //     this.parentCategories = resp.body;
    //   },
    //   (err: HttpErrorResponse) => {
    //     console.log(err.message);
    //   });
  }

  addSubCategory() {
    // const subCategory = <ProductCategoryForCreation>this.subCategoryForm.value;
    // this.categoryService.addCategory(subCategory).subscribe(resp => {
    //   this.getCategoriesTree();
    // }, (err: HttpErrorResponse) => {
    //   console.log(err.message);
    // });
  }



}

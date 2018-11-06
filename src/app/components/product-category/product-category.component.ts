import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {ProductCategory} from '../../models/product-category.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import {DeleteAlertComponent} from '../shared/delete-alert/delete-alert.component';


@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  categories: ProductCategory[];
  treeError = false;
  edit = false;

  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService,
              private dialog: MatDialog) {
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
    });
  }

  getCategories() {
    this.categoryService.fetchProductCategories().subscribe(resp => {
        this.categories = resp;
      },
      (err: HttpErrorResponse) => {
        this.treeError = true;
      });
  }

  deleteCategory(categoryId: string) {
    this.dialog.open(DeleteAlertComponent, {
      data: {title: 'Are you sure ? This will remove all subcategories, and products if exists'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteProductCategory(categoryId).subscribe(resp => {
          this.getCategories();
        });
      }
    });
  }
}

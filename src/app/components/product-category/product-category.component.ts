import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductsCategoriesService} from '../../services/products-categories/products-categories.service';
import {ProductCategory} from '../../models/product-category.interface';
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
  edit = false;
  editId = '';

  constructor(private fb: FormBuilder,
              private categoryService: ProductsCategoriesService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getCategories();
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'nameEng': new FormControl('', [Validators.required]),
      'productCategoryId': new FormControl('')
    });
  }

  addCategory() {
    const data = this.categoryForm.value;
    this.categoryService.addProductCategory(data).subscribe(resp => {
      this.categoryForm.reset();
      this.getCategories();
    });
  }

  getCategories() {
    this.categoryService.fetchProductCategories().subscribe(resp => {
      this.categories = resp;
    });
  }

  setEditCategory(category: ProductCategory) {
    this.edit = true;
    this.categoryForm.controls['name'].setValue(category.name);
    this.categoryForm.controls['nameEng'].setValue(category.nameEng);
    this.editId = category.id;
  }

  editCategory() {
    const data = this.categoryForm.value;
    this.categoryService.updateCategory(this.editId, data).subscribe(resp => {
      this.getCategories();
      this.editId = '';
      this.edit = false;
      this.categoryForm.reset();
    });
  }

  deleteCategory(category: ProductCategory) {
    this.dialog.open(DeleteAlertComponent, {
      data: {title: `Are you sure to remove ${category.name} ? This will remove all subcategories, and products if exists`}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteProductCategory(category.id).subscribe(resp => {
          this.getCategories();
        });
      }
    });
  }

  sendFormByEnter() {
    if (this.categoryForm.invalid) {
      return;
    }
    if (this.edit) {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }
}

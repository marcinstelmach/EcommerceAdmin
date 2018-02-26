import {Component, OnInit} from '@angular/core';
import {ProductCategoryForDisplay} from '../../../models/productCategoryForDisplay';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCategoryForCreation} from '../../../models/productCategoryForCreation';
import {HttpErrorResponse} from '@angular/common/http';
import {ProductCategoryTreeForDisplay} from '../../../models/productCategoryTreeForDisplay';
import {ProductCategoryService} from '../../../services/productCategoryService';
import {CharmCategoryForCreation} from '../../../models/charmCategoryForCreation';
import {CharmCategoriesService} from '../../../services/charmCategoriesService';
import {CharmCategoryForDisplay} from '../../../models/charmCategoryForDisplay';

@Component({
  selector: 'app-charm-category',
  templateUrl: './charm-category.component.html',
  styleUrls: ['./charm-category.component.css']
})
export class CharmCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  categoryForCreation: CharmCategoryForCreation;
  errors: any;
  categories: CharmCategoryForDisplay[] = [];
  treeError = false;
  currentCategoryId: number;

  constructor(private fb: FormBuilder,
              private categoryService: CharmCategoriesService) {
  }

  ngOnInit() {
    this.getCharmCategories();
    this.createFormForm();
  }

  createFormForm() {
    this.categoryForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
    });
  }


  addCategory() {
    this.categoryForCreation = <CharmCategoryForCreation>this.categoryForm.value;
    this.categoryService.addCategory(this.categoryForCreation).subscribe(resp => {
        this.getCharmCategories();
      },
      (err: HttpErrorResponse) => {
        this.errors = err.error;
        console.log(err);
      });
  }

  getCharmCategories() {
    this.categoryService.getCategories().subscribe(resp => {
        this.categories = resp.body;
      },
      (err: HttpErrorResponse) => {
        this.treeError = true;
      });
  }

  deleteCategoryModal(categoryId: number) {
    this.currentCategoryId = categoryId;
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.currentCategoryId).subscribe(resp => {
        this.currentCategoryId = null;
        this.getCharmCategories();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      });
  }


}

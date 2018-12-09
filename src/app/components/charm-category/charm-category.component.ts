import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CharmCategory} from '../../models/charm-category.interface';
import {CharmCategoriesService} from '../../services/charm-categories/charm-categories.service';
import {DeleteAlertComponent} from '../shared/delete-alert/delete-alert.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-charm-category',
  templateUrl: './charm-category.component.html',
  styleUrls: ['./charm-category.component.css']
})
export class CharmCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  categories: CharmCategory[];
  edit = false;
  editId = '';

  constructor(private fb: FormBuilder,
              private categoryService: CharmCategoriesService,
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
    });
  }


  addCategory() {
    this.categoryService.addCharmCategory(this.categoryForm.value).subscribe(resp => {
      this.getCategories();
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(resp => {
      this.categories = resp;
    });
  }

  setEditCategory(category: CharmCategory) {
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


  deleteCategory(categoryId: string) {
    this.dialog.open(DeleteAlertComponent, {
      data: {title: 'Are you sure ? This will remove all subcategories, and products if exists'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategory(categoryId).subscribe(resp => {
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

  cancelEdit() {
    this.edit = false;
    this.categoryForm.reset();
  }
}

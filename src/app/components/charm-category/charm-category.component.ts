import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CharmCategoryForDisplay} from '../../models/charmCategoryForDisplay';
import {CharmCategoriesService} from '../../services/charm-categories/charm-categories.service';


@Component({
  selector: 'app-charm-category',
  templateUrl: './charm-category.component.html',
  styleUrls: ['./charm-category.component.css']
})
export class CharmCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  categories: CharmCategoryForDisplay[];

  constructor(private fb: FormBuilder,
              private categoryService: CharmCategoriesService) {
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
    console.log(this.categoryForm.value);
    // this.categoryService.addCharmCategory(this.categoryForm.value).subscribe(resp => {
    //   console.log(resp);
    // });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(resp => {
      this.categories = resp.body;
    });
  }

  //
  // deleteCategory() {
  //   this.categoryService.deleteCategory(this.currentCategoryId).subscribe(resp => {
  //       this.currentCategoryId = null;
  //       this.getCategories();
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log(err.message);
  //     });
  // }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {ProductCategoryDiscountService} from '../../../services/product-category-discount/product-category-discount.service';
import {ProductCategoryDiscount} from '../../../models/product-category-discount.interface';
import {CategoryForDiscount} from '../../../models/category-for.discount';

@Component({
  selector: 'app-category-discount',
  templateUrl: './category-discount.component.html',
  styleUrls: ['./category-discount.component.css']
})
export class CategoryDiscountComponent implements OnInit {
  discountForm: FormGroup;
  discounts: ProductCategoryDiscount[];
  dateMin: Date;
  discountsTable: any;
  discountsTableColumns: string[] = ['position', 'name', 'description', 'percentValue', 'availableFrom', 'availableTo', 'isActive'];
  categoriesTable: any;
  categoriesTableColumns: string[] = ['position', 'name', 'select'];
  edit = false;
  editId = '';
  editName = '';

  constructor(private fb: FormBuilder,
              private categoryDiscountService: ProductCategoryDiscountService) {
  }

  ngOnInit() {
    this.getDiscounts();
    this.createForm();
  }

  createForm() {
    this.discountForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'nameEng': new FormControl('', [Validators.required]),
      'description': new FormControl('', [Validators.required]),
      'descriptionEng': new FormControl('', [Validators.required]),
      'percentValue': new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)]),
      'availableFrom': new FormControl('', [Validators.required]),
      'availableTo': new FormControl({value: '', disabled: true}, [Validators.required]),
    });
  }

  enableDateTo() {
    this.discountForm.controls['availableTo'].enable();
    const availableFrom = this.discountForm.controls['availableFrom'].value as Date;
    this.dateMin = new Date(availableFrom);
    this.dateMin.setDate(this.dateMin.getDate() + 1);
  }

  addDiscount() {
    this.categoryDiscountService.addDiscount(this.discountForm.value).subscribe(resp => {
      this.getDiscounts();
    });
  }

  getDiscounts() {
    this.categoryDiscountService.getDiscounts().subscribe(data => {
      this.discounts = data;
      this.buildTable(this.discounts);
    });
  }

  sendFormByEnter() {
    if (this.discountForm.invalid) {
      return;
    }
    if (this.edit) {
      this.editDiscount();
    } else {
      this.addDiscount();
    }
  }

  buildTable(data: ProductCategoryDiscount[]) {
    this.discountsTable = new MatTableDataSource<ProductCategoryDiscount>(data);
  }

  openDiscount(discount: ProductCategoryDiscount) {
    this.getCategoriesForDiscount(discount.id);
    this.edit = true;
    this.editId = discount.id;
    this.editName = discount.name;
    this.setFormValue(discount);
  }

  editDiscount() {
    const data = this.discountForm.value;
    this.categoryDiscountService.updateDiscount(this.editId, data).subscribe(resp => {
      this.edit = false;
      this.ngOnInit();
    });
  }

  getCategoriesForDiscount(id: string) {
    this.categoryDiscountService.getCategoriesForDiscount(id).subscribe(data => {
      console.log(data);
      this.categoriesTable = new MatTableDataSource<CategoryForDiscount[]>(data);
    });
  }

  saveCategoriesForDiscount() {
    let data = this.categoriesTable.data
      .filter(s => s.selected === true)
      .map(s => s.id);
    data = {categoryIds: data};

    this.categoryDiscountService.setCategories(this.editId, data).subscribe(resp => {
      this.edit = false;
      this.ngOnInit();
    });
  }

  setSelectValue(category: CategoryForDiscount, event: any) {
    const data = this.categoriesTable.data;
    const index = data.indexOf(category);
    data[index].selected = event.checked;
    this.categoriesTable.data = data;
  }

  private setFormValue(discount: ProductCategoryDiscount) {
    this.discountForm.controls['name'].setValue(discount.name);
    this.discountForm.controls['nameEng'].setValue(discount.nameEng);
    this.discountForm.controls['description'].setValue(discount.description);
    this.discountForm.controls['descriptionEng'].setValue(discount.descriptionEng);
    this.discountForm.controls['percentValue'].setValue(discount.percentValue);
    this.discountForm.controls['availableFrom'].setValue(discount.availableFrom);
    this.discountForm.controls['availableTo'].setValue(discount.availableTo);
  }
}

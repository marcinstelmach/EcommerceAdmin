import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {ProductCategoryDiscountService} from '../../../services/product-category-discount/product-category-discount.service';
import {ProductCategoryDiscount} from '../../../models/product-category-discount.interface';

@Component({
  selector: 'app-category-discount',
  templateUrl: './category-discount.component.html',
  styleUrls: ['./category-discount.component.css']
})
export class CategoryDiscountComponent implements OnInit {
  discountForm: FormGroup;
  discounts: ProductCategoryDiscount[];
  dateMin: Date = new Date();
  discountsTable: any;
  discountsTableColumns: string[] = ['position', 'name', 'description', 'percentValue', 'availableFrom', 'availableTo', 'isActive'];

  constructor(private fb: FormBuilder,
              private categoryDiscountService: ProductCategoryDiscountService,
              private dialog: MatDialog) {
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
    this.dateMin.setDate(availableFrom.getDate() + 1);
  }

  addDiscount() {
    this.categoryDiscountService.addDiscount(this.discountForm.value).subscribe(resp => {
      this.getDiscounts();
    });
  }

  getDiscounts() {
    this.categoryDiscountService.getDisoounts().subscribe(data => {
      this.discounts = data;
      this.buildTable(this.discounts);
    });
  }

  sendFormByEnter() {
    if (this.discountForm.invalid) {
      return;
    }
    this.addDiscount();
  }

  buildTable(data: ProductCategoryDiscount[]) {
    this.discountsTable = new MatTableDataSource<ProductCategoryDiscount>(data);
  }

  openDiscount(discount: ProductCategoryDiscount) {
console.log('Open');
  }
}

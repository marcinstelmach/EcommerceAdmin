import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ProductCategory} from '../../../models/product-category.interface';
import {CategoryDiscountModal} from '../../../models/category-discount.interface';
import {ProductCategoryDiscount} from '../../../models/product-category-discount.interface';
import {ProductCategoryDiscountService} from '../../../services/product-category-discount/product-category-discount.service';

@Component({
  selector: 'app-open-category-discount',
  templateUrl: './open-category-discount.component.html',
  styleUrls: ['./open-category-discount.component.css']
})
export class OpenCategoryDiscountComponent implements OnInit {
  categories: ProductCategory[];
  discount: ProductCategoryDiscount;


  constructor(@Inject(MAT_DIALOG_DATA) public modalData: CategoryDiscountModal,
              private categoryService: ProductCategoryDiscountService) {
    this.categories = modalData.productCategories;
    this.discount = modalData.discounts;
  }

  ngOnInit() {
    this.getSomething();
  }

  openRemoveModal() {

  }

  save() {
  }

  getSomething() {
    this.categoryService.getDiscounts().subscribe(data => {
      console.log(data);
    });
  }
}

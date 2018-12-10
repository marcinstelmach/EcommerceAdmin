import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {Product} from '../../../models/product.interface';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {DeleteAlertComponent} from '../../shared/delete-alert/delete-alert.component';
import {ProductsService} from '../../../services/products/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.product.component.html',
  styleUrls: ['./edit.product.component.css']
})
export class EditProductComponent implements OnInit {
  productEditForm: FormGroup;
  categoryName = '';
  contentHost = environment.contentHost;

  constructor(@Inject(MAT_DIALOG_DATA) public product: Product,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private productService: ProductsService) {
  }

  ngOnInit() {
    this.createForm();
  }

  editProduct() {
    const data = this.productEditForm.value;
    this.productService.updateProduct(this.product.id, data).subscribe(data => {
      window.location.reload();
    });
  }

  createForm() {
    this.productEditForm = this.fb.group({
      'name': new FormControl(this.product.name, [Validators.required]),
      'nameEng': new FormControl(this.product.nameEng, [Validators.required]),
      'description': new FormControl(this.product.description, Validators.required),
      'descriptionEng': new FormControl(this.product.descriptionEng, Validators.required),
      'price': new FormControl(this.product.price, [Validators.required, Validators.pattern('^\\d{0,8}(\\.\\d{1,2})?$')]),
      'sizes': new FormControl(this.product.sizes),
      'productCategory': new FormControl({value: this.categoryName, disabled: true}, Validators.required)
    });
  }

  openRemoveModal() {
    this.dialog.open(DeleteAlertComponent, {
      data: {title: 'Are you sure, you want to remove this product?'}
    }).afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(this.product.id).subscribe(data => {
          window.location.reload();
        });
      }
    });
  }
}

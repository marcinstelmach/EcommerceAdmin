import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material';
import {OrderDiscount} from '../../../models/order-discount.interface';
import {OrderDiscountService} from '../../../services/order-discount/order-discount.service';

@Component({
  selector: 'app-code-discount',
  templateUrl: './code-discount.component.html',
  styleUrls: ['./code-discount.component.css']
})
export class CodeDiscountComponent implements OnInit {
  discountForm: FormGroup;
  discounts: OrderDiscount[];
  dateMin: Date;
  discountsTable: any;
  discountsTableColumns: string[] = ['position', 'name', 'code', 'percentValue', 'availableFrom', 'availableTo', 'isActive'];
  edit = false;
  editId = '';
  editName = '';

  constructor(private fb: FormBuilder,
              private orderDiscountService: OrderDiscountService) {
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
      'code': new FormControl('', [Validators.required, Validators.maxLength(30)]),
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
    this.orderDiscountService.addDiscount(this.discountForm.value).subscribe(resp => {
      this.getDiscounts();
    });
  }

  getDiscounts() {
    this.orderDiscountService.getDiscounts().subscribe(data => {
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

  buildTable(data: OrderDiscount[]) {
    this.discountsTable = new MatTableDataSource<OrderDiscount>(data);
  }

  editDiscount() {
    this.discountForm.controls['availableTo'].enable();
    const data = this.discountForm.value;
    this.orderDiscountService.updateDiscount(this.editId, data).subscribe(resp => {
      this.edit = false;
      this.ngOnInit();
    });
  }

  setEdit(discount: OrderDiscount) {
    this.edit = true;
    this.editId = discount.id;
    this.editName = discount.name;
    this.setFormValue(discount);

  }

  private setFormValue(discount: OrderDiscount) {
    this.discountForm.controls['name'].setValue(discount.name);
    this.discountForm.controls['nameEng'].setValue(discount.nameEng);
    this.discountForm.controls['description'].setValue(discount.description);
    this.discountForm.controls['descriptionEng'].setValue(discount.descriptionEng);
    this.discountForm.controls['percentValue'].setValue(discount.percentValue);
    this.discountForm.controls['code'].setValue(discount.code);
    this.discountForm.controls['code'].disable();
    this.discountForm.controls['availableFrom'].setValue(discount.availableFrom);
    this.discountForm.controls['availableTo'].setValue(discount.availableTo);
  }

}

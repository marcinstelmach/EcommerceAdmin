import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {OrderList} from '../../models/order-interface';
import {MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: OrderList[];
  ordersTable: any;
  ordersTableColumns: string[] = ['position', 'email', 'date', 'price', 'isPayed', 'isShipped', 'isClosed'];
  filterForm: FormGroup;

  constructor(private orderService: OrderService, private router: Router, private fb: FormBuilder) {
    this.createFilterForm();
  }

  ngOnInit() {
    this.getLastOrders();
  }

  getLastOrders() {
    this.orderService.getFiltered().subscribe(data => {
      this.orders = data;
      this.buildTable();
    });
  }

  buildTable() {
    this.ordersTable = new MatTableDataSource<OrderList>(this.orders);
  }

  openOrder(id: string) {
    this.router.navigate(['orders', id]);
  }

  createFilterForm() {
    this.filterForm = this.fb.group({
      'id': new FormControl(''),
      'dateFrom': new FormControl(''),
      'dateTo': new FormControl(''),
      'isShipped': new FormControl(''),
      'isPayed': new FormControl(''),
      'isClosed': new FormControl(''),
    });
  }

  filterOrders() {
    console.log(this.filterForm);
  }
}

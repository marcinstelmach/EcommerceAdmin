import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../../../models/order-interface';
import {OrderService} from '../../../../services/order/order.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-edit.order',
  templateUrl: './edit.order.component.html',
  styleUrls: ['./edit.order.component.css']
})
export class EditOrderComponent implements OnInit {
  orderId: string;
  order: Order;
  orderTable: any;
  orderTableColumns: string[] = ['position', 'creationDateTime', 'finalPrice', 'basePrice', 'shipmentPrice', 'isPayed', 'isShipped',
    'isClosed', 'payedDateTime', 'closedDateTime'];

  constructor(private router: Router, private orderService: OrderService) { }

  ngOnInit() {
    this.orderId = this.router.url.split('/')[2];
    this.getOrder();
  }

  getOrder() {
    this.orderService.get(this.orderId).subscribe(data => {
      this.order = data;
      console.log(this.order);
      this.buildOrderTable(this.order);
    });
  }

  buildOrderTable(order: Order) {
    this.orderTable = new MatTableDataSource<Order>([order]);
  }
}

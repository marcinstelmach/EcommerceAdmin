import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Order} from '../../../../models/order-interface';
import {OrderService} from '../../../../services/order/order.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';

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
    'isClosed', 'payedDateTime', 'shipmentDateTime', 'closedDateTime'];

  constructor(private router: Router,
              private orderService: OrderService,
              private updatedAlert: MatSnackBar) { }

  ngOnInit() {
    this.orderId = this.router.url.split('/')[2];
    this.getOrder();
  }

  getOrder() {
    this.orderService.get(this.orderId).subscribe(data => {
      this.order = data;
      this.buildOrderTable(this.order);
    });
  }

  buildOrderTable(order: Order) {
    this.orderTable = new MatTableDataSource<Order>([order]);
  }

  update(property: string) {
    if (property === 'payed') {
      this.order.isPayed = !this.order.isPayed;
    }
    if (property === 'closed') {
      this.order.isClosed = !this.order.isClosed;
    }
    if (property === 'shipped') {
      this.order.isShipped = !this.order.isShipped;
    }

    this.orderService.update(this.order).subscribe(data => {
      this.updatedAlert.open('Updated !', 'Close', {
        duration: 2000
      });
      this.getOrder();
    });
  }
}

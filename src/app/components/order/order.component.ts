import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {OrderList} from '../../models/order-interface';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: OrderList[];
  ordersTable: any;
  ordersTableColumns: string[] = ['position', 'email', 'date', 'price', 'isPayed', 'isShipped', 'isClosed'];

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.getLastOrders();
  }

  getLastOrders() {
    this.orderService.getFiltered().subscribe(data => {
      this.orders = data;
      console.log(this.orders);
      this.buildTable();
    });
  }

  buildTable() {
    this.ordersTable = new MatTableDataSource<OrderList>(this.orders);
  }

  openOrder(id: string) {

  }
}

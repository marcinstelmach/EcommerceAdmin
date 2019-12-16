import {Shipment} from './shipment.interface';
import {User} from './user.interface';
import {Address} from './address.interface';
import {OrderDiscount} from './order-discount.interface';
import {ProductCategoryDiscount} from './product-category-discount.interface';
import {Product} from './product.interface';
import {Charm} from './charm.interface';

export interface Order {
  id: number;
  isShipped: boolean;
  isPayed: boolean;
  isClosed: boolean;
  comment: string;
  basePrice: number;
  shipmentPrice: number;
  finalPrice: number;
  creationDateTime: Date;
  payedDateTime: Date;
  closedDateTime: Date;
  shipmentDateTime: Date;
  shipment: Shipment;
  user: User;
  address: Address;
  orderDiscount: OrderDiscount;
  productOrders: ProductOrder[];
}

export interface OrderList {
  id: number;
  email: string;
  idShipped: boolean;
  isPayed: boolean;
  isClosed: boolean;
  comment: string;
  basePrice: number;
  shipmentPrice: number;
  finalPrice: number;
  creationDateTime: Date;
  payedDateTime: Date;
  closedDateTime: Date;
}

export interface ProductOrder {
  id: string;
  amount: number;
  currentProductPrice: number;
  finalPrice: number;
  comment: string;
  charmsPrice: number;
  productCategoryDiscount: ProductCategoryDiscount;
  product: Product;
  productOrderCharms: ProductOrderCharm[];
  images: Image[];
}

export interface ProductOrderCharm {
  currentPrice: number;
  sequence: number;
  charm: Charm;
}

export class OrderFilter {
  id;
  dateFrom;
  dateTo;
  isShipped;
  isPayed;
  isClosed;
  take;

  constructor() {
    this.id = '';
    this.dateFrom = '';
    this.dateTo = '';
    this.isShipped = '';
    this.isClosed = '';
    this.take = '';
  }
}


export class Image {
  imageUrl: string;
  isMain: boolean;
}

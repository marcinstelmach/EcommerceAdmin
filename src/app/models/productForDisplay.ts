import {ProductStatus} from './types/productStatus';

export class ProductForDisplay {
  id: number;
  name: string;
  price: number;
  categoryId: number;
  status: ProductStatus;
  description: string;
  hasCharms: boolean;
  colors: string;
  sizes: string;
}

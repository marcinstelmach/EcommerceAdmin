import {Image} from './image.interface';

export interface Product {
  id: number;
  name: string;
  nameEng: string;
  price: number;
  description: string;
  descriptionEng: string;
  acceptCharms: boolean;
  sizes: string;
  productCategoryId: string;
  images: Image[];
}

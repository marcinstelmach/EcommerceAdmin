import {ProductCategoryForDisplay} from './productCategoryForDisplay';

export interface ProductCategoryTreeForDisplay {
  id: number;
  name: string;
  isPremium: boolean;
  children: ProductCategoryForDisplay[];
}

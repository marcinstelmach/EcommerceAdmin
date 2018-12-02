import {ProductCategory} from './product-category.interface';
import {ProductCategoryDiscount} from './product-category-discount.interface';

export interface CategoryDiscountModal {
  discounts: ProductCategoryDiscount;
  productCategories: ProductCategory[];
}

export interface ProductCategory {
  id?: string;
  name: string;
  nameEng: string;
  productCategories: ProductCategory[];
}

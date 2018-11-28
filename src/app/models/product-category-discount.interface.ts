import DateTimeFormat = Intl.DateTimeFormat;

export interface ProductCategoryDiscount {
  id: string;
  name: string;
  nameEng: string;
  description: string;
  descriptionEng: string;
  percentValue: number;
  isActive: boolean;
  availableFrom: DateTimeFormat;
  availableTo: DateTimeFormat;
}

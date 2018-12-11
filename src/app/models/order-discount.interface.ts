import DateTimeFormat = Intl.DateTimeFormat;

export interface OrderDiscount {
  id: string;
  name: string;
  nameEng: string;
  description: string;
  descriptionEng: string;
  percentValue: number;
  isActive: boolean;
  code: string;
  availableFrom: DateTimeFormat;
  availableTo: DateTimeFormat;
}

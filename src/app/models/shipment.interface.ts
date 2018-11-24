import {ShipmentType} from './types/shipment.type';

export interface Shipment {
  id: string;
  name: string;
  nameEng: string;
  description: string;
  descriptionEng: string;
  price: number;
  isActive: boolean;
  type: ShipmentType;
}

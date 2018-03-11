import {charmStatus} from './types/charmStatus';

export class CharmForDisplay {
  id: number;
  name: string;
  imageUrl: string;
  uniqueName: string;
  price: number;
  status: charmStatus;
  charmCategoryId: number;
}

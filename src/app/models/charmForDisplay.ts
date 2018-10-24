import {charmStatus} from './types/charmStatus';

export class CharmForDisplay {
  id: number;
  name: string;
  uniqueName: string;
  price: number;
  status: charmStatus;
  charmCategoryId: number;
}

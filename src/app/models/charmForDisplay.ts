import {charmStatus} from './types/charmStatus';

export class CharmInterface {
  id: number;
  name: string;
  uniqueName: string;
  price: number;
  status: charmStatus;
  charmCategoryId: number;
}

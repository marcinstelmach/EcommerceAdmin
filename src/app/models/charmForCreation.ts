import {charmStatus} from './types/charmStatus';

export class CharmForCreation {
  name: string;
  price: number;
  type: charmStatus;
  charmCategoryId: number;
  imageExtension: string;
}

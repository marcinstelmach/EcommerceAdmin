import {Charm} from './charm.interface';

export interface CharmCategory {
  id: string;
  name: string;
  nameEng: string;
  charms: Charm[];
}

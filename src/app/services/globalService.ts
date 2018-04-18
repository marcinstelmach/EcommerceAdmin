import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {
  public servicePath = 'http://localhost:60474/api/';
  public charmPath = 'http://localhost:60474/';
}

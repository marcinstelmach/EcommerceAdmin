import {Injectable} from '@angular/core';

@Injectable()
export class GlobalService {
  public servicePath = 'http://localhost:60474/api/';
  public assetsPath = 'c:\\angular\\streetwood_assets\\';

  // public servicePath = 'https://marcinstelmach.azurewebsites.net/api/';
}

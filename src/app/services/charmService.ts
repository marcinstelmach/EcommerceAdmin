import {Injectable} from '@angular/core';
import {GlobalService} from './globalService';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CharmCategoryService} from './charmCategoryService';
import {Observable} from 'rxjs/Observable';
import {CharmCategoryForDisplay} from '../models/charmCategoryForDisplay';
import {CharmCategoryWithCharms} from '../models/charmCategoryWithCharms';

@Injectable()
export class CharmService {

  constructor(private globalService: GlobalService,
              private http: HttpClient,
              private charmCategoryService: CharmCategoryService) {

  }

  getCategories(): Observable<HttpResponse<CharmCategoryForDisplay[]>> {
    return this.charmCategoryService.getCategories();
  }

  getCategoriesWithCharms(): Observable<HttpResponse<CharmCategoryWithCharms[]>> {
    return this.charmCategoryService.getCategoriesWithCharms();
  }

}

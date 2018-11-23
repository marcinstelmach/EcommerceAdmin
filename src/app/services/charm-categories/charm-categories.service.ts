import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_CHARMS_CATEGORY_URL} from 'app/constants/enpoints';

@Injectable()
export class CharmCategoriesService {

  constructor(private http: HttpClient) {
  }

  public addCharmCategory(data): Observable<any> {
    return this.http.post(API_CHARMS_CATEGORY_URL, data);
  }

  public getCategories(): Observable<any> {
    return this.http.get(API_CHARMS_CATEGORY_URL);
  }

  public getCategoriesById(id: string): Observable<any> {
    return this.http.get(API_CHARMS_CATEGORY_URL + '/' + id);
  }

  public updateCategory(id: string, data: any): Observable<any> {
    return this.http.put(API_CHARMS_CATEGORY_URL + '/' + id, data);
  }

  public deleteCategory(id: string): Observable<any> {
    return this.http.delete(API_CHARMS_CATEGORY_URL + '/' + id);
  }
}

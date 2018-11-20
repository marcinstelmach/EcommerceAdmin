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
    return this.http.get('/api/CharmCategories');
  }

  public getCategoriesById(id: string): Observable<any> {
    return this.http.get('/api/CharmCategories/' + id);
  }


  public deleteCategory(id: number): Observable<any> {
    return this.http.delete('/api/CharmCategories/' + id);
  }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_USERS} from '../../constants/enpoints';
import {UserData} from '../../models/user.interface';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<any> {
    return this.http.get(API_USERS);
  }

  public addUser(user: UserData): Observable<any> {
    return this.http.post(API_USERS, user);
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get(API_USERS + '/' + id);
  }

  public ereaseUser(id: string): Observable<any> {
    return this.http.put(API_USERS + '/erase/' + id, null);
  }

  public register(params: UserData): Observable<any> {
    return this.http.post(API_USERS, params);
  }
}

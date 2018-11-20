import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {API_USERS} from 'app/constants/enpoints';
import {UserData} from 'app/models/user.interface';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) {
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

  // public register(params: UserData): Observable<any> {
  //   return this.http.post(API_USERS, params).pipe(
  //     tap(response => {
  //       this.toastr.success('Success, user account created');
  //       this.router.navigate(['/login']);
  //     }),
  //     catchError((error: HttpErrorResponse) => {
  //       this.toastr.error(error.message);
  //
  //       return of(new Error(error.message));
  //     })
  //   );
  // }

  public register(params: UserData): Observable<any> {
    return this.http.post(API_USERS, params);
  }
}

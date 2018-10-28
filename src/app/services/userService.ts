// import { Injectable } from '@angular/core';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// import { UserForCreation } from '../models/userForCreation';
// import { UserLoginResponseFromApi, UserForLogin } from '../models/userForLogin';
// import { UserForDisplay } from '../models/userForDisplay';
// import { TokenModel } from '../models/tokenModel';
// import { API_LOGIN_URL } from '../constants/enpoints';

// @Injectable()
// export class UserService {
//   private url: string;

//   constructor(private http: HttpClient) {
//   }

//   public register(user: UserForCreation): Observable<UserForDisplay> {
//     return <Observable<UserForDisplay>>this.http.post(this.url, user);
//   }

//   public login(user: UserForLogin): Observable<UserLoginResponseFromApi> {
//     return <Observable<UserLoginResponseFromApi>>this.http.post(API_LOGIN_URL, user);
//   }

// }

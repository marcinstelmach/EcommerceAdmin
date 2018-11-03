import { Router } from '@angular/router';
import { RegisterComponent } from './../../components/register/register.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {tap, map} from 'rxjs/internal/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { API_USERS } from 'app/constants/enpoints';
import { UserData } from 'app/models/user.interface';
import { AuthService } from 'app/services/auth/auth.service';
import { HttpResponse } from "@angular/common/http";
import { UserDataResponseFromApi } from '../../models/user.interface';
import { ToastrService } from "ngx-toastr";

@Injectable()
export class UserService {
  private token: string = '';
  private usersList = new BehaviorSubject<UserDataResponseFromApi[]>(null);

  constructor(private http: HttpClient,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) {
    this.token = this.authService.getToken();
  }

  public getUsers(): Observable<UserDataResponseFromApi[]> {
    return this.usersList.asObservable();
  }

  public loadUsers(): void {
    const options = {
      headers: this.getHeadersOptions()
    }; 

    this.http.get(API_USERS, options).pipe(
      tap((response: UserDataResponseFromApi[]) => {
        this.loadUsersData(response);
        this.toastr.success('Success, data fetched from api');
    }),
      catchError(val => {
        this.toastr.error("Error occured!");
        return of(`I caught: ${val}`)
      })
    )
    .subscribe();
  }

  public addUser(user: UserData): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.post(API_USERS, user, options);
  }

  public getUserById(id: number): Observable<any> {
    const options = {
      headers: this.getHeadersOptions()
    };

    return this.http.get(API_USERS + '/' + id, options);
  }

  public ereaseUser(id: string): void {
    const options = {
      headers: this.getHeadersOptions()
    };

    this.http.put(API_USERS + '/erase/' + id, null, options)
      .pipe(
        tap(response => {
          this.toastr.success('Success, data fetched from api');
          this.loadUsers();
        }),
        catchError((error: HttpErrorResponse) => { 
          this.toastr.error(error.message);
          
          return of(null)
        })
      )
      .subscribe();
  }

  public register(params: UserData): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(API_USERS, params, options).pipe(
        tap(response => {
          this.toastr.success('Success, user account created');
          this.router.navigate(['/login']);
        }),
        catchError((error: HttpErrorResponse) => { 
          this.toastr.error(error.message);
          
          return of(new Error(error.message));
        })
      );
  }

  private getHeadersOptions(): any {
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };

    return headers;
  }

  private loadUsersData(data: UserDataResponseFromApi[]): void {
    this.usersList.next(data);
  }
}

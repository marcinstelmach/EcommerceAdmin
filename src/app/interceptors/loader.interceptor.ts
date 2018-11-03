import { tap } from 'rxjs/internal/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private spinner: NgxSpinnerService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinner.show();
        return next.handle(request).pipe(
            tap(response => {
                if (response instanceof HttpResponse) { 
                    this.spinner.hide();       
                }
            }),
            catchError(error => {
                this.spinner.hide();  
                
                return of(error);
            })        
        );
    }
}
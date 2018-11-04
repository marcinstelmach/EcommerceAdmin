import {tap} from 'rxjs/internal/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ErrorModalComponent} from '../components/shared/alert/error-modal.component';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService,
              private dialog: MatDialog) {
  }

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
        this.dialog.open(ErrorModalComponent, {
          data: error.error,
        });
        return of(error);
      })
    );
  }
}

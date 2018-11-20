import {tap} from 'rxjs/internal/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ErrorModalComponent} from '../components/shared/alert/error-modal.component';
import {AuthService} from '../services/auth/auth.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const authToken = 'Bearer ' + this.authService.getToken();
    const authReq = request.clone({ setHeaders: { Authorization: authToken, 'Content-Type': 'application/json' } });
    return next.handle(authReq).pipe(
      tap(response => {
        if (response instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      catchError(error => {
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: error,
        });
        return of(error);
      })
    );
  }
}

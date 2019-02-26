import {tap} from 'rxjs/internal/operators';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {NgxSpinnerService} from 'ngx-spinner';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatDialog} from '@angular/material';
import {ErrorModalComponent} from '../components/shared/error-alert/error-modal.component';
import {AuthService} from '../services/auth/auth.service';
import {environment} from '../../environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    const preparedRequest = this.prepareRequest(request);
    return next.handle(preparedRequest).pipe(
      tap(response => {
        if (response instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      catchError(error => {
        if (error instanceof HttpErrorResponse) {

        }
        this.spinner.hide();
        this.dialog.open(ErrorModalComponent, {
          data: error,
        });
        return of(error);
      })
    );
  }

  prepareRequest(request: HttpRequest<any>) {
    const authToken = 'Bearer ' + this.authService.getToken();
    const authReq = request.clone({setHeaders: {Authorization: authToken, 'Content-Type': 'application/json'}});
    if (environment.production === true) {
      const newUrl = `${environment.backendPath}${authReq.url}`;
      const prodRequest = authReq.clone({url: newUrl});
      return prodRequest;
    }
    return authReq;
  }
}

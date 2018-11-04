import {LoaderInterceptor} from './loader.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


export const Interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptor,
    multi: true
  }
];

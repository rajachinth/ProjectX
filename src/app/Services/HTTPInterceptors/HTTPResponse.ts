import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, retry, timeout, finalize } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class HttpResponseInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        if(request instanceof HttpResponse)
        {
            return next.handle(request)
                   .pipe(retry(2),
                    timeout(10000),
                    catchError((error: Response) => {
                    if (error.status == 400) {
                      return throwError({response:400,message:'Bad Request'});
                    }
                    if (error.status == 404) {
                      return throwError({response:404,message:'Not Found Error'});
                    }
                    if (error.status == 500) {
                      return throwError({response:500,message:'Internal Server Error'});
                    }
                    if (error.status == 409) {
                      return throwError({response:409,message:'Internal Conflict Error'});
                    } else {
                      return throwError({response:null,message:'Unknown Server Issue'});
                    }
                    }),
                    finalize(() => {
                     /* toast notification logic here */
                    })
                    );
        }
        else return next.handle(request);
    }
  }
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    var currentHeaders: HttpHeaders = req.headers;
    currentHeaders = currentHeaders.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    var formedRequest = req.clone({headers: currentHeaders});
    return next.handle(formedRequest).pipe(catchError((error: HttpErrorResponse): Observable<any> => {
      console.log(error.status)
      this.router.navigate(['/', 'login'])
      return Observable.throw(error)
      }))
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
    var currentHeaders: HttpHeaders = req.headers;
    currentHeaders = currentHeaders.append('Authorization', 'Bearer ' + window.localStorage.getItem('token'));
    console.log(window.localStorage.getItem('token'));
    console.log(currentHeaders);
    return next.handle(req.clone({headers: currentHeaders}));
  }
}

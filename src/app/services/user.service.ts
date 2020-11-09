import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { HttpErrorHandlerService, HandleError } from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private handleError: HandleError;

  httpOptions = {
    headers: new HttpHeaders()
      .set('content-type', 'application/json')
  };

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  register(user) {
    return this.http.post<any>(`${environment.api_base_url}/auth/register`, user).pipe(
      catchError(this.handleError<any>('register', user))
    );
  }

  login(user) {
    return this.http.post<any>(`${environment.api_base_url}/auth/login`, user).pipe(
      catchError(this.handleError<any>('login', user))
    );
  }

  userprofile() {
    return this.http.get<any>(`${environment.api_base_url}/auth/user-profile`).pipe(
      catchError(this.handleError<any>('login'))
    );
  }

  initPlay() {
    return this.http.post<any>(`${environment.api_base_url}/auth/init-play`, null, this.httpOptions).pipe(
      catchError(this.handleError<any>('initPlay'))
    );
  }

  playTurn(game) {
    return this.http.post<any>(`${environment.api_base_url}/auth/play-turn`, game, this.httpOptions).pipe(
      catchError(this.handleError<any>('play-turn'))
    );
  }

  saveGame(game) {
    return this.http.post<any>(`${environment.api_base_url}/auth/save-game`, game, this.httpOptions).pipe(
      catchError(this.handleError<any>('save-game'))
    );
  }

  mygames() {
    return this.http.get<any>(`${environment.api_base_url}/auth/my-games`).pipe(
      catchError(this.handleError<any>('my-games'))
    );
  }

  mygameinfo(game) {
    return this.http.get<any>(`${environment.api_base_url}/auth/my-game-info`,{params:game}).pipe(
      catchError(this.handleError<any>('my-game-info'))
    );
  }
}

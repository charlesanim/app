/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Collection,
  GameDetails,
  Platforms,
  SearchRequest,
  SearchResponse,
} from '@app/home';
import { LoginRequest, LoginResponse } from 'libs/data-models/models';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public apiUrl = 'https://games.excellentpeople.com';

  private accessGrantedSubject$ = new BehaviorSubject<LoginResponse>(null);

  accessGranted$ = this.accessGrantedSubject$.asObservable();

  constructor(private http: HttpClient) {
    const accessGranted = localStorage.getItem('accessGranted');
    if (accessGranted) {
      this.accessGrantedSubject$.next(JSON.parse(accessGranted));
    }
  }

  login(authenticate: LoginRequest) {
    const request = new FormData();
    request.append('username', authenticate.username);
    request.append('password', authenticate.password);
    return this.http.post(`${this.apiUrl}/login`, request).pipe(
      tap((res: LoginResponse) => {
        this.accessGrantedSubject$.next(res);
        localStorage.setItem('accessGranted', JSON.stringify(res));
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('accessGranted');
    this.accessGrantedSubject$.next(null);
  }

  searchGame(searchRequest: SearchRequest) {
    const params: HttpParams = new HttpParams().set(
      'platformId',
      ((searchRequest.platformId as unknown) as string) || ''
    );

    return this.http
      .get(`${this.apiUrl}/Games/search/${searchRequest.gameName}`, { params })
      .pipe(map((res: SearchResponse[]) => res));
  }

  fetchPlatforms() {
    return this.http
      .get(`${this.apiUrl}/Platforms`)
      .pipe(map((res: Platforms[]) => res));
  }

  fetchGame(gameId: number) {
    return this.http
      .get(`${this.apiUrl}/Games/${gameId}`)
      .pipe(map((res: GameDetails[]) => res));
  }

  fetchCollection() {
    return this.http
      .get(`${this.apiUrl}/Collection`)
      .pipe(map((res: Collection[]) => res));
  }

  saveGame(gameId: number) {
    return this.http
      .post(`${this.apiUrl}/Collection/`, gameId)
      .pipe(map((res: any) => res));
  }
  deleteGame(gameId: number) {
    return this.http
      .delete(`${this.apiUrl}/Collection/${gameId}`)
      .pipe(map((res: any) => res));
  }
}

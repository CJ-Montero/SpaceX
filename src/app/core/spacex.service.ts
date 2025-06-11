import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch, Rocket } from './models/spacex.models';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {
  private baseUrl = 'https://api.spacexdata.com/v4';

  constructor(private http: HttpClient) {}

  getRandomLaunch(): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseUrl}/launches/latest`);
  }

  getRockets(): Observable<Rocket[]> {
    return this.http.get<Rocket[]>(`${this.baseUrl}/rockets`);
  }

  searchMission(name: string): Observable<Launch> {
    return this.http.get<Launch>(`${this.baseUrl}/launches/query`, { params: { name } });
  }
}

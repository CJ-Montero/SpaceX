import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.post<{ docs: Launch[] }>(`${this.baseUrl}/launches/query`, {
      query: {
        $or: [
          { name: { $regex: name, $options: 'i' } },
          { 'payloads.name': { $regex: name, $options: 'i' } }
        ]
      },
      options: {
        limit: 5, // Aumenta para ver más resultados
        sort: { date_utc: -1 }
      }
    }).pipe(
      map(response => response.docs[0] || null)
    );
  }
}

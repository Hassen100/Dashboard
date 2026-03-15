import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface KpiData {
  sessions: number;
  users: number;
  pageviews: number;
  bounceRate: number;
}

export interface TrafficPoint {
  label: string;
  sessions: number;
  organic: number;
}

export interface TopPage {
  url: string;
  views: number;
  trend: string;
  trendIcon?: string;
  trendPercent?: number;
}

export interface Keyword {
  keyword: string;
  term?: string;
  position: number;
  ctr: number;
}

@Injectable({ providedIn: 'root' })
export class SeoDataService {
  
  private API = 'https://votre-backend.railway.app/api';
  
  constructor(private http: HttpClient) {}

  getKpis(start?: string, end?: string): Observable<KpiData> {
    const params = start ? `?start=${start}&end=${end}` : '';
    return this.http.get<KpiData>(`${this.API}/kpis${params}`);
  }

  getTrafficData(): Observable<TrafficPoint[]> {
    return this.http.get<TrafficPoint[]>(`${this.API}/traffic`);
  }

  getTopPages(): Observable<TopPage[]> {
    return this.http.get<TopPage[]>(`${this.API}/top-pages`);
  }

  // Simuler les mots-clés pour l'instant
  getKeywords(): Observable<Keyword[]> {
    const mockKeywords: Keyword[] = [
      { term: 'audit seo gratuit', keyword: 'audit seo gratuit', position: 3, ctr: 28.5 },
      { term: 'referencement site', keyword: 'referencement site', position: 7, ctr: 19.2 },
      { term: 'optimisation seo', keyword: 'optimisation seo', position: 5, ctr: 22.1 },
      { term: 'consultant seo paris', keyword: 'consultant seo paris', position: 12, ctr: 15.8 }
    ];
    return new Observable(observer => {
      observer.next(mockKeywords);
      observer.complete();
    });
  }
}

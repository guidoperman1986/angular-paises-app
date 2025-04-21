import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl = 'https://restcountries.com/v3.1';
  error!: boolean;
  isLoading = signal(false);

  constructor(private http: HttpClient) { }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  get httpParams(): HttpParams {
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flags,population,translations');
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url/* , { params: this.httpParams } */);
  }

  getPaisPorCode(id: string): Observable<Country> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url, { params: this.httpParams });
  }

  buscarRegion(region: string): Observable<Country[]> {
    const params = new HttpParams().set('fields', 'name,capital,alpha2Code,flags,population,translations,cca3');

    const url = `${this.apiUrl}/region/${region}?`;
    return this.http.get<Country[]>(url, { params });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiUrl = 'https://restcountries.com/v2';
  error!: boolean;

  constructor(private http: HttpClient) {}

  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  get httpParams(): HttpParams {
    return new HttpParams().set('fields', 'name,capital,alpha2Code,flags,population')
  }

  buscarCapital(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }

  getPaisPorCode(id: string): Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url, { params: this.httpParams });
  }

  buscarRegion(region: string): Observable<Country[]>{
    const url = `${this.apiUrl}/regionalbloc/${region}?`;
    return this.http.get<Country[]>(url, { params: this.httpParams });
  }
}

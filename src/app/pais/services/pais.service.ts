import { HttpClient } from '@angular/common/http';
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

  buscarPais(termino: string): Observable<Country[] | Country> {

    const url = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(url)/* .pipe(
      tap((data:any)=>{
        if (data.status === 404){
          this.error = true;
        }
      })
    ); */
  }

  buscarCapital(termino: string): Observable<Country[] | Country> {

    const url = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(url);
  }

  getPaisPorCode(id: string): Observable<Country>{
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(url);
  }
}

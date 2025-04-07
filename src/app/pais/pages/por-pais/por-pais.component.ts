import { Component, OnInit, signal } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { PaisInputComponent } from '../../components/pais-input/pais-input.component';
import { NgIf, NgFor, JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaisTableComponent } from '../../components/pais-table/pais-table.component';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
  imports: [PaisInputComponent, NgIf, NgFor, RouterLink, PaisTableComponent, JsonPipe]
})
export class PorPaisComponent implements OnInit {
  termino!: string;
  hayError!: boolean;
  paises: Country[] = [];
  sugestedCountries = signal<Country[]>([]);
  mostrarSugerencias!: boolean;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void { }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    
    this.paisService.searchCountry(termino).subscribe(
      (countrys: Country[] | Country) => {
        if (Array.isArray(countrys)) {
          if (countrys.length === 0) {
            this.hayError = true;
          }

          this.paises = countrys;
        } else {
          this.paises = [];
          this.hayError = true;
        }
      },
      (error: any) => {
        console.log(error);
      });
  }

  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;

    this.paisService.searchCountry(termino).subscribe({
      next: (countries: Country[]) => {
        if (countries.length === 0) {
          this.sugestedCountries.set([]);
          return;
        } else {
          this.sugestedCountries.set(countries.slice(0, 5));
        }
      },
      error: (err) => {
        this.sugestedCountries.set([]);
        this.hayError = true;
      }
    })




    /* paises=>this.paisesSugeridos.set(paises.slice(0, 5)),
    (err)=> this.paisesSugeridos.set([]) */

  }

  buscarSugerido(termino: string) {
    this.buscar(termino);

  }

}

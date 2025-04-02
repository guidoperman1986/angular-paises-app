import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
    selector: 'app-por-pais',
    templateUrl: './por-pais.component.html',
    styleUrls: ['./por-pais.component.css'],
    standalone: false
})
export class PorPaisComponent implements OnInit {
  termino!: string;
  hayError!: boolean;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarSugerencias!: boolean;

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    this.paisService.buscarPais(termino).subscribe(
      (countrys: Country[] | Country) => {
        if (Array.isArray(countrys)){
          this.paises = countrys;
        } else {
          this.paises = [];
          this.hayError = true;
        }
      },
      (error) => {
        console.log(error);
      });
  }

  sugerencias(termino: string){
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;

    this.paisService.buscarPais(termino).subscribe(
      paises=>this.paisesSugeridos = paises.slice(0, 5),
      (err)=> this.paisesSugeridos = []
    )
  }

  buscarSugerido(termino: string){
    this.buscar(termino);

  }

}

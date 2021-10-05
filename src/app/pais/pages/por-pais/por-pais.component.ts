import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css'],
})
export class PorPaisComponent implements OnInit {
  termino!: string;
  hayError!: boolean;
  paises: Country[] = [];


  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
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

  sugerencias(event: string){
    console.log(event);
  }
}

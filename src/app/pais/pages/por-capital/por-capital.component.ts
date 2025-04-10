import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { PaisInputComponent } from '../../components/pais-input/pais-input.component';
import { NgIf } from '@angular/common';
import { PaisTableComponent } from '../../components/pais-table/pais-table.component';

@Component({
    selector: 'app-por-capital',
    templateUrl: './por-capital.component.html',
    styleUrls: ['./por-capital.component.css'],
    imports: [PaisInputComponent, NgIf, PaisTableComponent]
})
export class PorCapitalComponent implements OnInit {
  termino!: string;
  hayError!: boolean;
  paises: Country[] = [];

  constructor(private paisService: PaisService) {}

  ngOnInit(): void {}

  buscar(termino: string) {
    this.hayError = false;
    this.paisService.buscarCapital(termino).subscribe(
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

}

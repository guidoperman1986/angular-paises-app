import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { NgFor, TitleCasePipe } from '@angular/common';
import { PaisTableComponent } from '../../components/pais-table/pais-table.component';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
  imports: [NgFor, PaisTableComponent, TitleCasePipe]
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic'];
  regionActiva: string = '';
  paises: Country[] = [];



  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  activarRegion(region: string) {
    this.regionActiva = region;

    this.paisService.buscarRegion(region).subscribe(paises => this.paises = paises);
  }

  getClassCss(region: string) {
    return (region === this.regionActiva)
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

}

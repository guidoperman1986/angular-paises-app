import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent implements OnInit {

  regiones: string[] = ['EU','EFTA','CARICOM','PA','AU','USAN','EEU','AL','ASEAN','CAIS','CEFTA','NAFTA','SAARC'];
  regionActiva: string = '';
  paises: Country[] = [];



  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
  }

  activarRegion(region:string){
    this.regionActiva = region;

    this.paisService.buscarRegion(region).subscribe(paises=>this.paises = paises);
  }

  getClassCss(region: string){
    return (region === this.regionActiva) 
            ? 'btn btn-primary'
            : 'btn btn-outline-primary';
  }

}

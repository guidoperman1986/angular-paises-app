import { NgFor, TitleCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PaisTableComponent } from '../../components/pais-table/pais-table.component';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css'],
  imports: [NgFor, PaisTableComponent, TitleCasePipe]
})
export class PorRegionComponent {

  paisService = inject(PaisService);
  regions = signal<string[]>(['Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic']);
  activeRegion = signal<string>('');
  paises: Country[] = [];


  rxRegions = rxResource({
    request: () => {
      if (this.activeRegion() !== '')
        return this.activeRegion()
      else
        return undefined;
    },
    loader: ({ request }) => this.paisService.buscarRegion(request)

  })

  activarRegion(region: string) {
    this.activeRegion.set(region);
  }

  getClassCss(region: string) {
    return (region === this.activeRegion())
      ? 'btn btn-primary'
      : 'btn btn-outline-primary';
  }

}

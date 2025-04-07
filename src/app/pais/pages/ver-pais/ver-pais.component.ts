import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { NgIf, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-ver-pais',
    templateUrl: './ver-pais.component.html',
    styleUrls: ['./ver-pais.component.css'],
    imports: [NgIf, DecimalPipe]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private ar: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    this.ar.params
      .pipe(
        switchMap(({id})=>this.paisService.getPaisPorCode(id)),
      )
      .subscribe((pais)=>{
        this.pais = pais;
    });
  }

}

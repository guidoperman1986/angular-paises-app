import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(private ar: ActivatedRoute, private paisService: PaisService) { }

  ngOnInit(): void {
    this.ar.params
      .pipe(
        switchMap(({id})=>this.paisService.getPaisPorCode(id)),
        /* tap((data)=>{console.log(data)}) */
      )
      .subscribe((pais)=>{
        this.pais = pais;
    });
  }

}

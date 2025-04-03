import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-pais-table',
    templateUrl: './pais-table.component.html',
    styleUrls: ['./pais-table.component.css'],
    imports: [NgIf, NgFor, RouterLink, DecimalPipe]
})
export class PaisTableComponent implements OnInit {

  @Input() paises: Country[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

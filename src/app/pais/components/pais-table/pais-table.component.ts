import { DecimalPipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styleUrls: ['./pais-table.component.css'],
  imports: [RouterLink, DecimalPipe]
})
export class PaisTableComponent implements OnInit {

  paises = input.required<Country[]>();

  constructor() { }

  ngOnInit(): void {
  }

}

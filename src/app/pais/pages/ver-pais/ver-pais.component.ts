import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { rxResource } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from '@angular/router';
import { PaisService } from '../../services/pais.service';
import { LoadingComponent } from "../../../shared/loading/loading.component";

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css'],
  imports: [DecimalPipe, LoadingComponent]
})
export class VerPaisComponent {

  ar = inject(ActivatedRoute);
  paisService = inject(PaisService);

  rxCountries = rxResource<any, string>({
    request: () => this.ar.snapshot.params['id'],
    loader: ({ request }) => this.paisService.getPaisPorCode(request),
  })

}

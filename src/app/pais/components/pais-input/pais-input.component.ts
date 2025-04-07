import { Component, input, OnInit, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styleUrls: ['./pais-input.component.css'],
  imports: [FormsModule]
})
export class PaisInputComponent implements OnInit {
  termino!: string;
  hayError!: boolean;
  onEnter = output<string>();
  onDebounce = output<string>();
  placeholder = input<string>();

  debouncer: Subject<string> = new Subject();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300), 
        filter(valor => valor.length > 0),
        distinctUntilChanged()
      )
      .subscribe(valor => {
        this.onDebounce.emit(valor)
      });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  searchTerm() {
    this.debouncer.next(this.termino)
  }
}

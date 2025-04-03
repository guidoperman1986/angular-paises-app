import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-pais-input',
    templateUrl: './pais-input.component.html',
    styleUrls: ['./pais-input.component.css'],
    imports: [FormsModule]
})
export class PaisInputComponent implements OnInit {
  termino!: string;
  hayError!: boolean;
  @Output() onEnter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter<string>();
  @Input() placeholder!: string;

  debouncer: Subject<string> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.debouncer
        .pipe(debounceTime(300))
        .subscribe(valor=>{
          this.onDebounce.emit(valor)
      

    });
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(){
    this.debouncer.next(this.termino)
  }
}

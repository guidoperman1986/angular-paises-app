import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisInputComponent } from './pais-input.component';

describe('PaisInputComponent', () => {
  let component: PaisInputComponent;
  let fixture: ComponentFixture<PaisInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisInputComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value after dobounce time, when input is not empty', () => {
    const debouncerSpy = spyOn(component.debouncer, 'next');
    const inputValue = 'test';
    component.termino = inputValue;
    component.searchTerm();
    expect(debouncerSpy).toHaveBeenCalledWith(inputValue);
  });

  it('should emit value when searchTerm is called', () => {
    const onDebounceSpy = spyOn(component.onDebounce, 'emit');

    component.termino = 'test';
    component.searchTerm();
    
    setTimeout(() => {
      expect(onDebounceSpy).toHaveBeenCalledWith('test');
    }
    , 300); // Wait for debounce time
  });

  it('should emit value when buscar is called', () => {
    const emitSpy = spyOn(component.onEnter, 'emit');
    const inputValue = 'test';
    component.termino = inputValue;
    component.buscar();

    expect(emitSpy).toHaveBeenCalledWith(inputValue);
  });
});

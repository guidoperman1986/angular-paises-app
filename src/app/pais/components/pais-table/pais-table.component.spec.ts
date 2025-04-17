import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisTableComponent } from './pais-table.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

const mockActivatedRoute = {
  params: of()
};


describe('PaisTableComponent', () => {
  let component: PaisTableComponent;
  let fixture: ComponentFixture<PaisTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisTableComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('paises', [
      {
        name: 'Argentina',
        alpha2Code: 'AR',
        alpha3Code: 'ARG',
        population: 45195777,
        area: 2780400,
        region: 'Americas',
        subregion: 'South America',
        flags: {
          png: 'https://flagcdn.com/w320/ar.png',
          svg: 'https://flagcdn.com/ar.svg'
        }
      }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

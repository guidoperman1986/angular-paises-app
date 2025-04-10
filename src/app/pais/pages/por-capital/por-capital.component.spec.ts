import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorCapitalComponent } from './por-capital.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { PaisService } from '../../services/pais.service';

const results = [
  {
    name: { common: 'United States', official: 'United States of America' },
    capital: ['Washington, D.C.'],
    alpha2Code: 'US',
    flags: { svg: 'https://flagcdn.com/us.svg', png: 'https://flagcdn.com/us.png' },
    population: 331002651,
  },
  {
    name: { common: 'Canada', official: 'Canada' },
    capital: ['Ottawa'],
    alpha2Code: 'CA',
    flags: { svg: 'https://flagcdn.com/ca.svg', png: 'https://flagcdn.com/ca.png' },
    population: 37742154,
  },
]

const mockCountryService = {
  buscarCapital: jasmine.createSpy('buscarCapital').and.callFake((term: string) => {
    return of();
  }),
}

describe('PorCapitalComponent', () => {
  let component: PorCapitalComponent;
  let fixture: ComponentFixture<PorCapitalComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorCapitalComponent],
      providers: [
        provideHttpClient(), 
        provideHttpClientTesting(),
        { provide: PaisService, useValue: mockCountryService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorCapitalComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should look for capital when buscar function is called', () => {
    mockCountryService.buscarCapital.and.returnValue(of(results));

    component.buscar('Madrid');

    expect(component.paises.length).toBe(2);
  });

  it('should look for capital when buscar function is called', () => {
    mockCountryService.buscarCapital.and.returnValue(throwError(() => new Error('Error occurred')));

    component.buscar('Madrid');

    expect(component.paises.length).toBe(0);
  });
  
});

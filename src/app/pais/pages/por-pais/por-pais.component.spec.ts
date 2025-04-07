import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorPaisComponent } from './por-pais.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { PaisService } from '../../services/pais.service';
import { of } from 'rxjs';

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
  searchCountry: jasmine.createSpy('searchCountry').and.callFake((term: string) => {
    return of();
  }),
}

describe('PorPaisComponent', () => {
  let component: PorPaisComponent;
  let fixture: ComponentFixture<PorPaisComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorPaisComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),
      { provide: PaisService, useValue: mockCountryService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorPaisComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchCountry and return a list of countries', () => {
    mockCountryService.searchCountry.and.returnValue(of(results));

    component.buscar('USA');
    expect(mockCountryService.searchCountry).toHaveBeenCalledWith('USA');
    expect(component.paises.length).toBe(2);
    expect(component.paises[0].name.common).toBe('United States');
  });

  it('should handle error when search throws 0 countries', () => {
    mockCountryService.searchCountry.and.returnValue(of([]));

    component.buscar('ARG');
    expect(mockCountryService.searchCountry).toHaveBeenCalledWith('ARG');
    expect(component.paises.length).toBe(0);
    expect(component.hayError).toBe(true);
  });
});

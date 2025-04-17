import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPaisComponent } from './ver-pais.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

/* function createMockCountry(overrides: Partial<Country> = {}): Country {
  return {
    name: {
      common: 'Default Country',
      official: 'Default Country Official Name',
      nativeName: {
        grn: {
          official: 'Default Country Native Name',
          common: 'Default Country Native Common Name',
        }, spa: {
          official: 'Default Country Native Name',
          common: 'Default Country Native Common Name',
        },
      },
    },
    tld: ['.default'],
    cca2: 'DC',
    ccn3: '000',
    cca3: 'DEF',
    cioc: 'DEF',
    independent: true,
    status: 'officially-assigned',
    unMember: true,
    currencies: {
      ARS: { name: 'Dollar', symbol: '$' }
    },
    idd: { root: '+1', suffixes: ['234'] },
    capital: ['Default Capital'],
    altSpellings: ['Default'],
    region: 'Default Region',
    subregion: 'Default Subregion',
    languages: {
      grn: 'Default Language',
      spa: 'Default Language',
    },
    translations: {},
    latlng: [0, 0],
    landlocked: false,
    borders: [],
    area: 123456,
    demonyms: { eng: { f: 'Default Female', m: 'Default Male' }, fra: { f: 'Default Female', m: 'Default Male' } },
    flag: '🏳️',
    maps: { googleMaps: 'https://maps.google.com', openStreetMaps: 'https://osm.org' },
    population: 1000000,
    gini: { '2019': 30.0 },
    fifa: 'DEF',
    car: { signs: ['D'], side: 'right' },
    timezones: ['UTC'],
    continents: ['Default Continent'],
    flags: { svg: 'https://flagcdn.com/default.svg', png: 'https://flagcdn.com/default.png', alt: 'Default Flag' },
    coatOfArms: { svg: '', png: '' },
    startOfWeek: 'monday',
    capitalInfo: { latlng: [0, 0] },
    postalCode: { format: '12345', regex: '\\d{5}' },
    ...overrides, // Override default values with provided ones
  };
} */

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

const mockActivatedRoute = {
  snapshot: {
    params: of({ id: 'USA' })

  }
};

describe('VerPaisComponent', () => {
  let component: VerPaisComponent;
  let fixture: ComponentFixture<VerPaisComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPaisComponent, RouterTestingModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        { provide: PaisService, useValue: mockCountryService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPaisComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  /* afterEach(() => {
    httpTestingController.verify(); // Ensure that there are no outstanding requests.
  }); */

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  /*  it('should create and fetch country data', () => {
     const mockResponse = createMockCountry();
 
     // Expect the HTTP request and flush the mock response
     const req = httpTestingController.expectOne(
       'https://restcountries.com/v3.1/alpha/USA?fields=name,capital,alpha2Code,flags,population');
     expect(component.pais).toEqual(mockResponse as Country);
     expect(req.request.method).toBe('GET');
     req.flush(mockResponse);
 
     // Verify that the component's `pais` property is updated
     expect(component.pais).toEqual(mockResponse);
     expect(component).toBeTruthy();
   }); */
});

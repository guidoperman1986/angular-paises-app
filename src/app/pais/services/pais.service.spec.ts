import { TestBed } from '@angular/core/testing';

import { PaisService } from './pais.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Country } from '../interfaces/pais.interface';

const mockCountries: Country[] = [
  {
    name: {
      common: 'Argentina',
      official: 'Argentine Republic',
      nativeName: {
        grn: {
          official: 'República Argentina',
          common: 'Argentina'
        },
        spa: {
          official: 'República Argentina', common: 'Argentina'
        }
      }
    },
    capital: ['Buenos Aires'],
    flags: { svg: 'arg.svg', png: 'arg.png', alt: 'Argentina flag' },
    population: 45195777,
    region: 'Americas',
    subregion: 'South America',
    cca2: 'AR',
    cca3: 'ARG',
    cioc: 'ARG',
    tld: ['.ar'],
    independent: true,
    unMember: true,
    currencies: { ARS: { name: 'Argentine peso', symbol: '$' } },
    languages: {
      spa: 'Spanish',
      grn: 'Guaraní',
    },
    borders: ['BOL', 'BRA', 'CHL', 'PRY', 'URY'],
    area: 2780400,
    demonyms: { eng: { f: 'Argentine', m: 'Argentine' }, fra: { f: 'Argentine', m: 'Argentin' } },
    latlng: [-34, -64],
    landlocked: false,
    timezones: ['UTC-03:00'],
    continents: ['South America'],
    maps: { googleMaps: 'https://goo.gl/maps/Arg', openStreetMaps: 'https://osm.org/Arg' },
    gini: { '2019': 42.9 },
    fifa: 'ARG',
    car: { signs: ['RA'], side: 'right' },
    startOfWeek: 'monday',
    capitalInfo: { latlng: [-34.6, -58.4] },
    postalCode: { format: '####', regex: '\\d{4}' },
    ccn3: '',
    status: '',
    idd: {
      root: '+5',
      suffixes: ['4']
    },
    altSpellings: [],
    translations: {},
    flag: '',
    coatOfArms: { png: '', svg: '' },
  },
];

describe('PaisService', () => {
  let service: PaisService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(PaisService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of countries when the API call is successful', () => {

    service.searchCountry('Argentina').subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpTestingController.expectOne('https://restcountries.com/v3.1/name/Argentina');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries); // Simulate a successful response
  });

  it('should return an empty array when the API call fails', () => {
    service.searchCountry('InvalidCountry').subscribe((countries) => {
      expect(countries).toEqual([]); // Expect an empty array on error
    });

    const req = httpTestingController.expectOne('https://restcountries.com/v3.1/name/InvalidCountry');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Network error')); // Simulate an error response
  });

  it('should return an array of capitals when the API call is successful', () => {


    service.buscarCapital('Argentina').subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpTestingController.expectOne('https://restcountries.com/v3.1/capital/Argentina');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries); // Simulate a successful response
  });

  it('should return an array when the API call for regions is successful', () => {

    service.buscarRegion('Argentina').subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpTestingController.expectOne('https://restcountries.com/v3.1/region/Argentina?fields=name,capital,alpha2Code,flags,population,translations,cca3');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries); // Simulate a successful response
  });






});

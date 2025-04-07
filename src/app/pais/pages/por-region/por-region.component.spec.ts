import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorRegionComponent } from './por-region.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';

describe('PorRegionComponent', () => {
  let component: PorRegionComponent;
  let fixture: ComponentFixture<PorRegionComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorRegionComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorRegionComponent);
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
});

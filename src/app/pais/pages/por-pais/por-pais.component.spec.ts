import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorPaisComponent } from './por-pais.component';

describe('PorPaisComponent', () => {
  let component: PorPaisComponent;
  let fixture: ComponentFixture<PorPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PorPaisComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PorPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

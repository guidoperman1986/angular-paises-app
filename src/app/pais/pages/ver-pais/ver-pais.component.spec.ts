import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPaisComponent } from './ver-pais.component';

describe('VerPaisComponent', () => {
  let component: VerPaisComponent;
  let fixture: ComponentFixture<VerPaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VerPaisComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRegPrescriptionComponent } from './show-reg-prescription.component';

describe('ShowRegPrescriptionComponent', () => {
  let component: ShowRegPrescriptionComponent;
  let fixture: ComponentFixture<ShowRegPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRegPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRegPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

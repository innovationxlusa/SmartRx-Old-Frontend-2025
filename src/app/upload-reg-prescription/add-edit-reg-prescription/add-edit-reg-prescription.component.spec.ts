import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRegPrescriptionComponent } from './add-edit-reg-prescription.component';

describe('AddEditRegPrescriptionComponent', () => {
  let component: AddEditRegPrescriptionComponent;
  let fixture: ComponentFixture<AddEditRegPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditRegPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRegPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

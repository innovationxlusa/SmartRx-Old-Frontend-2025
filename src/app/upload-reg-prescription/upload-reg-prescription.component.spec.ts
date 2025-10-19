import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRegPrescriptionComponent } from './upload-reg-prescription.component';

describe('UploadRegPrescriptionComponent', () => {
  let component: UploadRegPrescriptionComponent;
  let fixture: ComponentFixture<UploadRegPrescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRegPrescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRegPrescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartrxComponent } from './smartrx.component';

describe('SmartrxComponent', () => {
  let component: SmartrxComponent;
  let fixture: ComponentFixture<SmartrxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartrxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartrxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

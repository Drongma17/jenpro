import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllsnowbankComponent } from './allsnowbank.component';

describe('AllsnowbankComponent', () => {
  let component: AllsnowbankComponent;
  let fixture: ComponentFixture<AllsnowbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllsnowbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllsnowbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

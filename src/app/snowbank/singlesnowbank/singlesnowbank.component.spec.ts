import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglesnowbankComponent } from './singlesnowbank.component';

describe('SinglesnowbankComponent', () => {
  let component: SinglesnowbankComponent;
  let fixture: ComponentFixture<SinglesnowbankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglesnowbankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglesnowbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

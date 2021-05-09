import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInvestmentComponent } from './single-investment.component';

describe('SingleInvestmentComponent', () => {
  let component: SingleInvestmentComponent;
  let fixture: ComponentFixture<SingleInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

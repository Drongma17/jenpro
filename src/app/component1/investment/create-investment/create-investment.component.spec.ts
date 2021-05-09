import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvestmentComponent } from './create-investment.component';

describe('CreateInvestmentComponent', () => {
  let component: CreateInvestmentComponent;
  let fixture: ComponentFixture<CreateInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

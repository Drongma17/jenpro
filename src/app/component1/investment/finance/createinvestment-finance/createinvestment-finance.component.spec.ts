import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateinvestmentFinanceComponent } from './createinvestment-finance.component';

describe('CreateinvestmentFinanceComponent', () => {
  let component: CreateinvestmentFinanceComponent;
  let fixture: ComponentFixture<CreateinvestmentFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateinvestmentFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateinvestmentFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

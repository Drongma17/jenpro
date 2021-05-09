import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinvestmentFinanceComponent } from './listinvestment-finance.component';

describe('ListinvestmentFinanceComponent', () => {
  let component: ListinvestmentFinanceComponent;
  let fixture: ComponentFixture<ListinvestmentFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListinvestmentFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinvestmentFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

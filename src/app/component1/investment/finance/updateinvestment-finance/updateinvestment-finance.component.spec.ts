import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateinvestmentFinanceComponent } from './updateinvestment-finance.component';

describe('UpdateinvestmentFinanceComponent', () => {
  let component: UpdateinvestmentFinanceComponent;
  let fixture: ComponentFixture<UpdateinvestmentFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateinvestmentFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateinvestmentFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

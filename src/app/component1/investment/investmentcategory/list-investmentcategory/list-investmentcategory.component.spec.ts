import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvestmentcategoryComponent } from './list-investmentcategory.component';

describe('ListInvestmentcategoryComponent', () => {
  let component: ListInvestmentcategoryComponent;
  let fixture: ComponentFixture<ListInvestmentcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvestmentcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvestmentcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

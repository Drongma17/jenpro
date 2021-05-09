import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvestmentcategoryComponent } from './create-investmentcategory.component';

describe('CreateInvestmentcategoryComponent', () => {
  let component: CreateInvestmentcategoryComponent;
  let fixture: ComponentFixture<CreateInvestmentcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInvestmentcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvestmentcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

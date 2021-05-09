import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestmentcategoryComponent } from './update-investmentcategory.component';

describe('UpdateInvestmentcategoryComponent', () => {
  let component: UpdateInvestmentcategoryComponent;
  let fixture: ComponentFixture<UpdateInvestmentcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInvestmentcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInvestmentcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

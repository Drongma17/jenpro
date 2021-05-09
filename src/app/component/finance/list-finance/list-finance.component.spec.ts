import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinanceComponent } from './list-finance.component';

describe('ListFinanceComponent', () => {
  let component: ListFinanceComponent;
  let fixture: ComponentFixture<ListFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

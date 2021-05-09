import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBafinanceComponent } from './list-bafinance.component';

describe('ListBafinanceComponent', () => {
  let component: ListBafinanceComponent;
  let fixture: ComponentFixture<ListBafinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBafinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBafinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

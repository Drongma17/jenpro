import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLendmoneyComponent } from './list-lendmoney.component';

describe('ListLendmoneyComponent', () => {
  let component: ListLendmoneyComponent;
  let fixture: ComponentFixture<ListLendmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLendmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLendmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

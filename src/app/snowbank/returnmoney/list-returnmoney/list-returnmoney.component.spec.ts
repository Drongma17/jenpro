import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReturnmoneyComponent } from './list-returnmoney.component';

describe('ListReturnmoneyComponent', () => {
  let component: ListReturnmoneyComponent;
  let fixture: ComponentFixture<ListReturnmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReturnmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReturnmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

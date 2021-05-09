import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFinanceComponent } from './update-finance.component';

describe('UpdateFinanceComponent', () => {
  let component: UpdateFinanceComponent;
  let fixture: ComponentFixture<UpdateFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

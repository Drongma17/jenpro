import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInvestmentallocateComponent } from './list-investmentallocate.component';

describe('ListInvestmentallocateComponent', () => {
  let component: ListInvestmentallocateComponent;
  let fixture: ComponentFixture<ListInvestmentallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInvestmentallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInvestmentallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

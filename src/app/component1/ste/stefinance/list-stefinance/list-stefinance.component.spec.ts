import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStefinanceComponent } from './list-stefinance.component';

describe('ListStefinanceComponent', () => {
  let component: ListStefinanceComponent;
  let fixture: ComponentFixture<ListStefinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStefinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStefinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

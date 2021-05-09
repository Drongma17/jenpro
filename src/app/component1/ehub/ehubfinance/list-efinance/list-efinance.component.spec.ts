import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEfinanceComponent } from './list-efinance.component';

describe('ListEfinanceComponent', () => {
  let component: ListEfinanceComponent;
  let fixture: ComponentFixture<ListEfinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEfinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

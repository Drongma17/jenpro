import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusinessacComponent } from './list-businessac.component';

describe('ListBusinessacComponent', () => {
  let component: ListBusinessacComponent;
  let fixture: ComponentFixture<ListBusinessacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBusinessacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusinessacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSteComponent } from './list-ste.component';

describe('ListSteComponent', () => {
  let component: ListSteComponent;
  let fixture: ComponentFixture<ListSteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

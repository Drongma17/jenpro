import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllocateComponent } from './list-allocate.component';

describe('ListAllocateComponent', () => {
  let component: ListAllocateComponent;
  let fixture: ComponentFixture<ListAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

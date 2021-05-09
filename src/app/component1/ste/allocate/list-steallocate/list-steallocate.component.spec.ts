import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSteallocateComponent } from './list-steallocate.component';

describe('ListSteallocateComponent', () => {
  let component: ListSteallocateComponent;
  let fixture: ComponentFixture<ListSteallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSteallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSteallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBaallocateComponent } from './list-baallocate.component';

describe('ListBaallocateComponent', () => {
  let component: ListBaallocateComponent;
  let fixture: ComponentFixture<ListBaallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBaallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBaallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

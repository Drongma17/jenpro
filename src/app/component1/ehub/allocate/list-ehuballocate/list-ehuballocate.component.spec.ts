import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEhuballocateComponent } from './list-ehuballocate.component';

describe('ListEhuballocateComponent', () => {
  let component: ListEhuballocateComponent;
  let fixture: ComponentFixture<ListEhuballocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEhuballocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEhuballocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

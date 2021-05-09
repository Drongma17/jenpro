import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStecategoryComponent } from './list-stecategory.component';

describe('ListStecategoryComponent', () => {
  let component: ListStecategoryComponent;
  let fixture: ComponentFixture<ListStecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSbcategoryComponent } from './list-sbcategory.component';

describe('ListSbcategoryComponent', () => {
  let component: ListSbcategoryComponent;
  let fixture: ComponentFixture<ListSbcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSbcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSbcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

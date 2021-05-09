import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEhubcategoryComponent } from './list-ehubcategory.component';

describe('ListEhubcategoryComponent', () => {
  let component: ListEhubcategoryComponent;
  let fixture: ComponentFixture<ListEhubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEhubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEhubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBacategoryComponent } from './list-bacategory.component';

describe('ListBacategoryComponent', () => {
  let component: ListBacategoryComponent;
  let fixture: ComponentFixture<ListBacategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBacategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBacategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

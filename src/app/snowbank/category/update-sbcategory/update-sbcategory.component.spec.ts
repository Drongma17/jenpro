import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSbcategoryComponent } from './update-sbcategory.component';

describe('UpdateSbcategoryComponent', () => {
  let component: UpdateSbcategoryComponent;
  let fixture: ComponentFixture<UpdateSbcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSbcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSbcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

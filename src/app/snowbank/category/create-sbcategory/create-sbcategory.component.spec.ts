import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSbcategoryComponent } from './create-sbcategory.component';

describe('CreateSbcategoryComponent', () => {
  let component: CreateSbcategoryComponent;
  let fixture: ComponentFixture<CreateSbcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSbcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSbcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

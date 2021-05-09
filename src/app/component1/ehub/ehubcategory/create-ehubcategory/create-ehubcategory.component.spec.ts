import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEhubcategoryComponent } from './create-ehubcategory.component';

describe('CreateEhubcategoryComponent', () => {
  let component: CreateEhubcategoryComponent;
  let fixture: ComponentFixture<CreateEhubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEhubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEhubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

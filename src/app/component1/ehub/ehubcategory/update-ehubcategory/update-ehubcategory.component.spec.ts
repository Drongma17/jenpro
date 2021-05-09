import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEhubcategoryComponent } from './update-ehubcategory.component';

describe('UpdateEhubcategoryComponent', () => {
  let component: UpdateEhubcategoryComponent;
  let fixture: ComponentFixture<UpdateEhubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEhubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEhubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

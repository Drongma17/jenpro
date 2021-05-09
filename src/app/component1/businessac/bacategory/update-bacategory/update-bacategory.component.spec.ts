import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBacategoryComponent } from './update-bacategory.component';

describe('UpdateBacategoryComponent', () => {
  let component: UpdateBacategoryComponent;
  let fixture: ComponentFixture<UpdateBacategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBacategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBacategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

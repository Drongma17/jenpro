import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBacategoryComponent } from './create-bacategory.component';

describe('CreateBacategoryComponent', () => {
  let component: CreateBacategoryComponent;
  let fixture: ComponentFixture<CreateBacategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBacategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBacategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

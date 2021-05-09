import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAllocateComponent } from './create-allocate.component';

describe('CreateAllocateComponent', () => {
  let component: CreateAllocateComponent;
  let fixture: ComponentFixture<CreateAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

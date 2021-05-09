import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSteallocateComponent } from './create-steallocate.component';

describe('CreateSteallocateComponent', () => {
  let component: CreateSteallocateComponent;
  let fixture: ComponentFixture<CreateSteallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSteallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSteallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

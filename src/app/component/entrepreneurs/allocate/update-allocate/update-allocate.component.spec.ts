import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAllocateComponent } from './update-allocate.component';

describe('UpdateAllocateComponent', () => {
  let component: UpdateAllocateComponent;
  let fixture: ComponentFixture<UpdateAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

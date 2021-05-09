import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSteallocateComponent } from './update-steallocate.component';

describe('UpdateSteallocateComponent', () => {
  let component: UpdateSteallocateComponent;
  let fixture: ComponentFixture<UpdateSteallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSteallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSteallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

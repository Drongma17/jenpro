import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBaallocateComponent } from './update-baallocate.component';

describe('UpdateBaallocateComponent', () => {
  let component: UpdateBaallocateComponent;
  let fixture: ComponentFixture<UpdateBaallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBaallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBaallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

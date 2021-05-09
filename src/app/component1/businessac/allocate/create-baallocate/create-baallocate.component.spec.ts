import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBaallocateComponent } from './create-baallocate.component';

describe('CreateBaallocateComponent', () => {
  let component: CreateBaallocateComponent;
  let fixture: ComponentFixture<CreateBaallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBaallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBaallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

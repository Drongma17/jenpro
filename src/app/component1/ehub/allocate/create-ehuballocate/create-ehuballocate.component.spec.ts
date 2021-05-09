import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEhuballocateComponent } from './create-ehuballocate.component';

describe('CreateEhuballocateComponent', () => {
  let component: CreateEhuballocateComponent;
  let fixture: ComponentFixture<CreateEhuballocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEhuballocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEhuballocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

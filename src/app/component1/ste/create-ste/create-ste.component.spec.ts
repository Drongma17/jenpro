import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSteComponent } from './create-ste.component';

describe('CreateSteComponent', () => {
  let component: CreateSteComponent;
  let fixture: ComponentFixture<CreateSteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

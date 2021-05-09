import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSteComponent } from './single-ste.component';

describe('SingleSteComponent', () => {
  let component: SingleSteComponent;
  let fixture: ComponentFixture<SingleSteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

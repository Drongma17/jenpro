import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSteComponent } from './all-ste.component';

describe('AllSteComponent', () => {
  let component: AllSteComponent;
  let fixture: ComponentFixture<AllSteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

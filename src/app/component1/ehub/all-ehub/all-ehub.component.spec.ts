import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEhubComponent } from './all-ehub.component';

describe('AllEhubComponent', () => {
  let component: AllEhubComponent;
  let fixture: ComponentFixture<AllEhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

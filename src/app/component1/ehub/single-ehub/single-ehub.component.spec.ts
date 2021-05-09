import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEhubComponent } from './single-ehub.component';

describe('SingleEhubComponent', () => {
  let component: SingleEhubComponent;
  let fixture: ComponentFixture<SingleEhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleEhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

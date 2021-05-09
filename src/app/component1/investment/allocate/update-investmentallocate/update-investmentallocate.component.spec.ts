import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInvestmentallocateComponent } from './update-investmentallocate.component';

describe('UpdateInvestmentallocateComponent', () => {
  let component: UpdateInvestmentallocateComponent;
  let fixture: ComponentFixture<UpdateInvestmentallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInvestmentallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInvestmentallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInvestmentallocateComponent } from './create-investmentallocate.component';

describe('CreateInvestmentallocateComponent', () => {
  let component: CreateInvestmentallocateComponent;
  let fixture: ComponentFixture<CreateInvestmentallocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInvestmentallocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInvestmentallocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

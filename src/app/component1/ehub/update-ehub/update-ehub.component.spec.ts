import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEhubComponent } from './update-ehub.component';

describe('UpdateEhubComponent', () => {
  let component: UpdateEhubComponent;
  let fixture: ComponentFixture<UpdateEhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

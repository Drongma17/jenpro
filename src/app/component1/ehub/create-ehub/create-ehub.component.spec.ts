import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEhubComponent } from './create-ehub.component';

describe('CreateEhubComponent', () => {
  let component: CreateEhubComponent;
  let fixture: ComponentFixture<CreateEhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

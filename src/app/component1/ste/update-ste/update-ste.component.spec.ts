import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSteComponent } from './update-ste.component';

describe('UpdateSteComponent', () => {
  let component: UpdateSteComponent;
  let fixture: ComponentFixture<UpdateSteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

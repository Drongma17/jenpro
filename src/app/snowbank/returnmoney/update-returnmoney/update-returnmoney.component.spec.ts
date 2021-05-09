import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReturnmoneyComponent } from './update-returnmoney.component';

describe('UpdateReturnmoneyComponent', () => {
  let component: UpdateReturnmoneyComponent;
  let fixture: ComponentFixture<UpdateReturnmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateReturnmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReturnmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

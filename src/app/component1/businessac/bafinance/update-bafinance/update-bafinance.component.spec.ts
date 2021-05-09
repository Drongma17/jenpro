import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBafinanceComponent } from './update-bafinance.component';

describe('UpdateBafinanceComponent', () => {
  let component: UpdateBafinanceComponent;
  let fixture: ComponentFixture<UpdateBafinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBafinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBafinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

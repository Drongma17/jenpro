import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBafinanceComponent } from './create-bafinance.component';

describe('CreateBafinanceComponent', () => {
  let component: CreateBafinanceComponent;
  let fixture: ComponentFixture<CreateBafinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBafinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBafinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

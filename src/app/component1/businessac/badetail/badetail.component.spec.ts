import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadetailComponent } from './badetail.component';

describe('BadetailComponent', () => {
  let component: BadetailComponent;
  let fixture: ComponentFixture<BadetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

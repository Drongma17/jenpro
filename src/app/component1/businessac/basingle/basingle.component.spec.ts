import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasingleComponent } from './basingle.component';

describe('BasingleComponent', () => {
  let component: BasingleComponent;
  let fixture: ComponentFixture<BasingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

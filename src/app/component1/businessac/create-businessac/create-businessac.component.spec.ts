import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBusinessacComponent } from './create-businessac.component';

describe('CreateBusinessacComponent', () => {
  let component: CreateBusinessacComponent;
  let fixture: ComponentFixture<CreateBusinessacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBusinessacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBusinessacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

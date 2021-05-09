import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEfinanceComponent } from './create-efinance.component';

describe('CreateEfinanceComponent', () => {
  let component: CreateEfinanceComponent;
  let fixture: ComponentFixture<CreateEfinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEfinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

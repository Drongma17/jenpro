import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStefinanceComponent } from './create-stefinance.component';

describe('CreateStefinanceComponent', () => {
  let component: CreateStefinanceComponent;
  let fixture: ComponentFixture<CreateStefinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStefinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStefinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

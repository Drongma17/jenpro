import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReturnmoneyComponent } from './create-returnmoney.component';

describe('CreateReturnmoneyComponent', () => {
  let component: CreateReturnmoneyComponent;
  let fixture: ComponentFixture<CreateReturnmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReturnmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReturnmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

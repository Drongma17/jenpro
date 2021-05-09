import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLendmoneyComponent } from './create-lendmoney.component';

describe('CreateLendmoneyComponent', () => {
  let component: CreateLendmoneyComponent;
  let fixture: ComponentFixture<CreateLendmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLendmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLendmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

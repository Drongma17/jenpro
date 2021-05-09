import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLendmoneyComponent } from './update-lendmoney.component';

describe('UpdateLendmoneyComponent', () => {
  let component: UpdateLendmoneyComponent;
  let fixture: ComponentFixture<UpdateLendmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLendmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLendmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

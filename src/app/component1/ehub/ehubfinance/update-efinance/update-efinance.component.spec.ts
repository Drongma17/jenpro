import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEfinanceComponent } from './update-efinance.component';

describe('UpdateEfinanceComponent', () => {
  let component: UpdateEfinanceComponent;
  let fixture: ComponentFixture<UpdateEfinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEfinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

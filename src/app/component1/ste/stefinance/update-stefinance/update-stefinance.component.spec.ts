import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStefinanceComponent } from './update-stefinance.component';

describe('UpdateStefinanceComponent', () => {
  let component: UpdateStefinanceComponent;
  let fixture: ComponentFixture<UpdateStefinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStefinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStefinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

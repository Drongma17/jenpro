import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaeApplicationComponent } from './creae-application.component';

describe('CreaeApplicationComponent', () => {
  let component: CreaeApplicationComponent;
  let fixture: ComponentFixture<CreaeApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaeApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

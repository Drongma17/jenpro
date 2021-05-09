import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SteDetailComponent } from './ste-detail.component';

describe('SteDetailComponent', () => {
  let component: SteDetailComponent;
  let fixture: ComponentFixture<SteDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SteDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

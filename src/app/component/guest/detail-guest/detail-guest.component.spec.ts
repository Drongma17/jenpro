import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGuestComponent } from './detail-guest.component';

describe('DetailGuestComponent', () => {
  let component: DetailGuestComponent;
  let fixture: ComponentFixture<DetailGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

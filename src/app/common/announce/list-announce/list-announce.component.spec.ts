import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnounceComponent } from './list-announce.component';

describe('ListAnnounceComponent', () => {
  let component: ListAnnounceComponent;
  let fixture: ComponentFixture<ListAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

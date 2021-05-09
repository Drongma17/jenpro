import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAnnounceComponent } from './update-announce.component';

describe('UpdateAnnounceComponent', () => {
  let component: UpdateAnnounceComponent;
  let fixture: ComponentFixture<UpdateAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

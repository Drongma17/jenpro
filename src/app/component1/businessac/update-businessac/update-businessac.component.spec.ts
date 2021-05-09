import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBusinessacComponent } from './update-businessac.component';

describe('UpdateBusinessacComponent', () => {
  let component: UpdateBusinessacComponent;
  let fixture: ComponentFixture<UpdateBusinessacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBusinessacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBusinessacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEhuballocateComponent } from './update-ehuballocate.component';

describe('UpdateEhuballocateComponent', () => {
  let component: UpdateEhuballocateComponent;
  let fixture: ComponentFixture<UpdateEhuballocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEhuballocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEhuballocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

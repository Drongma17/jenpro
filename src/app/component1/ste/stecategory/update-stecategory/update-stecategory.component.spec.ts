import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStecategoryComponent } from './update-stecategory.component';

describe('UpdateStecategoryComponent', () => {
  let component: UpdateStecategoryComponent;
  let fixture: ComponentFixture<UpdateStecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

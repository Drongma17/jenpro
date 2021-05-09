import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStecategoryComponent } from './create-stecategory.component';

describe('CreateStecategoryComponent', () => {
  let component: CreateStecategoryComponent;
  let fixture: ComponentFixture<CreateStecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

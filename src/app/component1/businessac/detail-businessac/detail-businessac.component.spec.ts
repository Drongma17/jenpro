import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBusinessacComponent } from './detail-businessac.component';

describe('DetailBusinessacComponent', () => {
  let component: DetailBusinessacComponent;
  let fixture: ComponentFixture<DetailBusinessacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBusinessacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBusinessacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

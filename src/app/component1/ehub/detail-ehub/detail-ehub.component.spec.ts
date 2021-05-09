import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEhubComponent } from './detail-ehub.component';

describe('DetailEhubComponent', () => {
  let component: DetailEhubComponent;
  let fixture: ComponentFixture<DetailEhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

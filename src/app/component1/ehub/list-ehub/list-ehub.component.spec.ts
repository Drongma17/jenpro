import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEhubComponent } from './list-ehub.component';

describe('ListEhubComponent', () => {
  let component: ListEhubComponent;
  let fixture: ComponentFixture<ListEhubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEhubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

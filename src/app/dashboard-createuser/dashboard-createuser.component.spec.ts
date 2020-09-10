import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCreateuserComponent } from './dashboard-createuser.component';

describe('DashboardCreateuserComponent', () => {
  let component: DashboardCreateuserComponent;
  let fixture: ComponentFixture<DashboardCreateuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCreateuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

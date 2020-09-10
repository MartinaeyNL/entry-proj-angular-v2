import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEdituserComponent } from './dashboard-edituser.component';

describe('DashboardEdituserComponent', () => {
  let component: DashboardEdituserComponent;
  let fixture: ComponentFixture<DashboardEdituserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEdituserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

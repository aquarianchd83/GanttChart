import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaintChartComponent } from './gaint-chart.component';

describe('GaintChartComponent', () => {
  let component: GaintChartComponent;
  let fixture: ComponentFixture<GaintChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaintChartComponent]
    });
    fixture = TestBed.createComponent(GaintChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

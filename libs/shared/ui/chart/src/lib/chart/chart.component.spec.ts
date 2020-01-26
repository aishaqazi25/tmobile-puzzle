import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { SharedUiChartModule } from './../shared-ui-chart.module';
import { of } from 'rxjs/internal/observable/of';
import { GoogleChartsModule } from 'angular-google-charts';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  const dataStub$ = {
    get() {
      return of([{ date: '2015-01-20', close: '110.35' },
      { date: '2015-01-21', close: '112.1' }, { date: '2015-01-22', close: '114.7' }], async);
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [SharedUiChartModule,
        GoogleChartsModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data$ = dataStub$.get();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
interface IChartData {
  title: string;
  type: string;
  data: any;
  columnNames: string[];
  options: any;
}
@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() data$: Observable<any>;
  chartData: any;
  chart: IChartData;

  constructor() { }

  ngOnInit() {
    this.chart = {
      title: 'Stocks',
      type: 'LineChart',
      data: [],
      columnNames: ['period', 'close'],
      options: { title: `Stock price`, width: '600', height: '400' }
    };

    this.data$.subscribe(newData => (this.chartData = newData));
  }
}

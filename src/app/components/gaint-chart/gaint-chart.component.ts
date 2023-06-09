import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GaintChart } from 'src/helper/GaintChart';
import { config } from 'src/helper/mockData';
import { Configuration } from 'src/models/configuration';
import { Data } from 'src/models/data';
import { Legend } from 'src/models/legend';

@Component({
  selector: 'app-gaint-chart',
  templateUrl: './gaint-chart.component.html',
  styleUrls: ['./gaint-chart.component.scss']
})
export class GaintChartComponent {
  @ViewChild('chartCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() config!: Configuration;
  @Input() values!: Data[];
  @Input() height: number = 400;
  @Input() width: number = 500;


  constructor() {
  }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.config = this.setConfigureValue(this.config);
    let chart = new GaintChart(canvas, this.config, this.values);
    chart.render();
  }

  get getLegends(): Legend[] {
    return this.values?.map(x => x.legend)
  }


  private setConfigureValue(chartConfig: Configuration | null): Configuration {
    if (chartConfig) {
      chartConfig.xAxis = chartConfig.xAxis || config.xAxis
      chartConfig.yAxis = chartConfig.yAxis || config.yAxis;
      chartConfig.lineWidth = chartConfig.lineWidth || config.lineWidth;
      chartConfig.pointSize = chartConfig.pointSize || config.pointSize;
    }
    else {
      chartConfig = config;
    }
    return chartConfig;
  }

}

import { Component, OnInit } from '@angular/core';
import { config } from 'src/helper/mockData';
import { Configuration } from 'src/models/configuration';
import { Data } from 'src/models/data';
import { GaintChartService } from 'src/services/gaint-chart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // declare the variable and assign the default values
  chart1_config: Configuration = config;
  data: Data[] = [];



  constructor(private gaintChartService: GaintChartService) { }

  ngOnInit(): void {
    this.getChartData();
  }

  getChartData() {
    this.gaintChartService.getData().subscribe(values => {
      this.data = values;
      console.log(this.chart1_config)
    });
  }
  
}
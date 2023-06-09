export class Configuration {
  xAxis!: { label: string, values: string[] };
  yAxis!: { label: string, values: number[] };
  lineWidth!: number;
  pointSize!: number;
  xInterval!: number;
  yInterval!: number;
  constructor(chartConfig: Partial<Configuration> ={}) {
    Object.assign(this, chartConfig);
  }

}
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Configuration } from 'src/models/configuration';
import { Data } from 'src/models/data';

@Injectable({
  providedIn: 'root'
})
export class GaintChartService {

  constructor() { }

  getData(): Observable<Data[]> {


    let values:Data[] = [{
      points: [10, 40, 30, 40, 60, 40, 10],
      legend: { color: "red", text: "Color A" }
    }
      ,
    {
      points: [0, 20, 40, 50, 70, 50, 30],
      legend: { color: "green", text: "Color B" }
    },
    {
      points: [50, 50, 0, 10, 20, 30, 40],
      legend: { color: "blue", text: "Color C" }
    }];


    return of(values);
  }

}

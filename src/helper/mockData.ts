import { Configuration } from "src/models/configuration";

export var config: Configuration = new Configuration({
    xAxis: { label: "Time", values: ['0', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'] },
    yAxis: { label: "Intensity", values: [0, 10, 20, 30, 40, 50, 60, 70] },
    lineWidth: 2,
    pointSize: 3,
    // xInterval : 60, //uncomment for set manually interval beetween xAxis
    //yInterval :40  //uncomment for set manually interval beetween yAxis
}
) 





import { Configuration } from "src/models/configuration";
import { Data } from "src/models/data";
export class GaintChart {
    canvas: HTMLCanvasElement;
    chartConfig: Configuration;
    data: Data[];
    initialX: number;
    initialY: number;
    chartWidth: number;
    chartHeight: number;
    strokeStyle: string = "black";
    font: string = "10px Arial";
    xAxisTextAlign: CanvasTextAlign = "center";
    xAxisTextBaseline: CanvasTextBaseline = "top";
    yAxisTextAlign: CanvasTextAlign = "right";
    yAxisTextBaseline: CanvasTextBaseline = "middle";

    constructor(canvas: HTMLCanvasElement, chartConfig: Configuration, data: Data[]) {
        this.canvas = canvas;
        this.chartConfig = chartConfig;
        this.data = data;
        this.initialX = (this.canvas.width * 10) / 100;
        this.initialY = (this.canvas.height * 10) / 100;
        this.chartWidth = this.canvas.width - (this.canvas.width * 20) / 100;
        this.chartHeight = this.canvas.height - (this.canvas.height * 20) / 100;
    }


    render() {
        let ctx = this.createRawChart(this.canvas, this.chartWidth, this.chartHeight, this.initialX, this.initialY)
        if (ctx != null) {
            this.insertDateIntoChart(ctx, this.chartWidth, this.chartHeight, this.initialX, this.initialY)
        }

    }

    createRawChart(canvas: HTMLCanvasElement, chartWidth: number, chartHeight: number, initialX: number, initialY: number): CanvasRenderingContext2D | null {
        var ctx = canvas.getContext('2d');
        if (ctx != null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = this.strokeStyle
            ctx.font = this.font;

            // Draw x-axis
            this.drawAxisX(ctx, initialX, chartHeight, initialY, chartWidth);

            // Draw y-axis 
            this.drawAxisY(initialY, chartHeight, ctx, initialX);
        }
        return ctx;

    }

    private drawAxisY(initialY: number, chartHeight: number, ctx: CanvasRenderingContext2D, initialX: number) {
        if (!this.chartConfig.yInterval) {
            this.chartConfig.yInterval = chartHeight / (this.chartConfig.yAxis.values.length - 1);
        }
        // Draw y-axis
        ctx.beginPath();
        ctx.moveTo(initialX, initialY);
        ctx.lineTo(initialX, chartHeight + initialY);
        ctx.stroke();


        ctx.textAlign = this.yAxisTextAlign;
        ctx.textBaseline = this.yAxisTextBaseline;
        this.chartConfig.yAxis.values.forEach((value, index) => {
            let x = initialY;
            let y = chartHeight + initialY - index * this.chartConfig.yInterval;
            ctx?.fillText(value.toString(), x, y);
        });

        // Draw y-axis label
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(this.chartConfig.yAxis.label, -(chartHeight + this.initialY)/2, this.initialX -40 );
        ctx.rotate(Math.PI / 2);
    }

    private drawAxisX(ctx: CanvasRenderingContext2D, initialX: number, chartHeight: number, initialY: number, chartWidth: number) {
        // Calculate the intervals between each value
        if (!this.chartConfig.xInterval) {
            this.chartConfig.xInterval = chartWidth / (this.chartConfig.xAxis.values.length - 1);
        }
        // Draw x-axis
        ctx.beginPath();
        ctx.moveTo(initialX, chartHeight + initialY);
        ctx.lineTo(chartWidth + initialX, chartHeight + initialY);
        ctx.stroke();

        // Draw x-axis values
        ctx.textAlign = this.xAxisTextAlign;
        ctx.textBaseline = this.xAxisTextBaseline;
        this.chartConfig.xAxis.values.forEach((value, index) => {
            let x = initialX + index * this.chartConfig.xInterval;
            let y = chartHeight + initialY + 10;
            ctx?.fillText(value, x, y);
        });

        // show x-axis label
        ctx.fillText(this.chartConfig.xAxis.label, ((chartWidth + initialX) / 2) + 30, chartHeight + initialY + 30);
    }

    private insertDateIntoChart(ctx: CanvasRenderingContext2D, chartWidth: number, chartHeight: number, initialX: number, initialY: number) {
        if (this.data) {
            this.data.forEach((data) => {
                ctx.beginPath();
                ctx.lineWidth = this.chartConfig.lineWidth;
                ctx.strokeStyle = data.legend.color
                data.points.forEach((value, pointIndex) => {
                    let x = initialX + pointIndex * this.chartConfig.xInterval;
                    let y =
                        chartHeight +
                        initialY -
                        ((this.chartConfig.yInterval * (this.chartConfig.yAxis.values.length - 1)) / (this.chartConfig.yAxis.values[this.chartConfig.yAxis.values.length - 1] - this.chartConfig.yAxis.values[0])) * value;
                    if (pointIndex === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                });
                ctx.stroke();
                data.points.forEach((value, pointIndex) => {
                    let x = initialX + pointIndex * this.chartConfig.xInterval;
                    let y =
                        chartHeight +
                        initialY -
                        ((this.chartConfig.yInterval * (this.chartConfig.yAxis.values.length - 1)) / (this.chartConfig.yAxis.values[this.chartConfig.yAxis.values.length - 1] - this.chartConfig.yAxis.values[0])) * value;

                    ctx.beginPath();
                    ctx.arc(x, y, this.chartConfig.pointSize, 0, 10);
                    ctx.closePath();
                    ctx.fillStyle = data.legend.color; // Set the fill color
                    ctx.fill();

                });

            });
        }
    }
}

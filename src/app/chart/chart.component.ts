import { Component, Input, SimpleChanges, OnChanges, OnInit } from "@angular/core";
import * as Highcharts from 'highcharts';
import { Options } from "highcharts";
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  max: number = 0;
  min: number = 0;
  reading: number = 0;
  range: number = 0;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  Highcharts: typeof Highcharts = Highcharts;
  @Input() data: Array<number>;
  @Input() name: string;
  updateFlag = false;
  chartOptions= {
    chart: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      type: "bar",
      margin: [1, 0, 1, 0],
      width: 250,
      height: 25,
      style: {
        overflow: "visible"
      }
    },
    title: {
      text: ""
    },
    credits: {
      enabled: false
    },
    xAxis: {
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      startOnTick: false,
      endOnTick: false,
      tickPositions: []
    },
    yAxis: {
      
    },
    legend: {
      enabled: false
    },
    tooltip: {
      
      },
      
   plotOptions: {
    columnrange: {
      grouping: false
  },
    series: {
        pointWidth: 15
    }
},
   series: []
  };
  ngOnChanges(change: SimpleChanges) {
    var vitalId = change.name.currentValue;
    //alert(change.data.currentValue);
    if(!vitalId){
      return;
    }
    
    if(Number((change.data.currentValue).Reading) != NaN){
      this.reading = parseFloat((change.data.currentValue).Reading);
    }
    if(Number((change.data.currentValue).MaxValue) != NaN){
      this.max = parseFloat((change.data.currentValue).MaxValue);
    }
    if(Number((change.data.currentValue).MinValue) != NaN){
      this.min = parseFloat((change.data.currentValue).MinValue);
    }
    
    this.range = this.max-this.min;

    var minStr = '< ' + (this.min).toString();
    var maxStr = (this.max).toString();
    var normalStr = (this.min+1).toString() + ' to ' + (this.max-1).toString();
    var readingStr = (this.reading).toString();

    this.chartOptions.tooltip = {
      hideDelay: 0,
        outside: true,
        shared: true,
        //headerFormat: '<span style="font-size: 10px">' + `{series.name}` + ', Q{point.x}:</span><br/>',
        formatter() {
            return '<span style="font-size: 10px">Low: ' + minStr  
            + '<br>'
            + 'Normal: ' + normalStr
            + '<br>'
            + 'High: >' + maxStr
            + '<br>'
            + '<b>User Reading: ' + readingStr + '</b>' + '</span>'
            
          
        }
    };

    this.chartOptions.yAxis = {
      endOnTick: false,
      startOnTick: false,
      labels: {
        enabled: false
      },
      title: {
        text: null
      },
      tickPositions: [0],
      plotBands: [],
      min: this.min - this.range,
      max: this.max + this.range,
      borderRadius: 15
    };

    this.chartOptions.series = [{
      
      stacking: true,
      //borderRadius: 15,
      name: 'high',
      //maxPointLength: this.max+this.range,
      color: 'rgba(255, 0, 0,.8)',
      data: [this.max],
      borderRadiusBottomLeft: '20px',
      borderRadiusBottomRight: '20px'
      
      
    },
    {
      stacking: true,
      name: 'normal',
      color: '#47d147',
      data: [this.range],
    },
    {
      stacking: true,
      name: 'low',
      color: 'rgba(255, 214, 51,1)',
      data: [this.min],
      //borderRadius: 15,
      //minPointLength: this.min+this.range,
      borderRadiusTopLeft: '20px',
      borderRadiusTopRight: '20px'
    },
    {
      type: 'line',
      name: 'reading',
      color: 'black',
      data: [this.reading],
    }];
    this.updateFlag = true;

    }


}

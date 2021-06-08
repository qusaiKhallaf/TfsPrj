import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // setTimeout(()=>{ 

    //   this.barChartType = 'bar'
    //  }
    // , 3000);  
  
  }

  public barChartLabels : Label[]  = ['2001' , '2002' , '2003' , '2004' , '2005' , '2006' , '2007' ] ;
  public barChartType : ChartType = 'bar'  //  doughnut    pie   bar  line
  public barChartLegend = true ; 
  public barChartPlugins = [pluginDataLabels] ; 
  public barChartData : ChartDataSets[] = [
    {data : [65 , 59 , 80 , 81 , 56 , 55 , 40] , label:'Series A' , weight:0.65 },
    {data : [28 , 48 , 40 , 19 , 86 , 27 , 90] , label:'Series B' , weight :0.33 }
  ] ;
  public barChartOptions: ChartOptions = {
    responsive: true,
    //cutoutPercentage : 80,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'start',
      }
    }
  };



  

}

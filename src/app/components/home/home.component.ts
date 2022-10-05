import { TownshipService } from '../../shared/services/township.service';
import { Township } from './../../shared/models/township.model';
import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  townships: Township[];
  arraytoPassChart = [];
  public result = 0;
  public perUur = 0;
  constructor(public townshipsService: TownshipService) { }

  ngOnInit() {
    this.townshipsService.getTownshipsByAmount().subscribe(tasks => {
      this.reset();
      //console.log(tasks);
      this.townships = tasks;
      tasks.forEach(item => {
        this.pieChartLabels.push(item.name.toString());
        this.pieChartData.push(item.amount);
        this.result += item.amount;
      })
      this.perUur = this.result / 6;
    });
    
    }

    reset(){
      this.pieChartLabels = [];
      this.pieChartData = [];
      this.result = 0;
    }
    public pieChartOptions: ChartOptions = {
      responsive: true,
      plugins: {
        datalabels: {
          color: '#FFFFFF',
          font: {
            size: 25
          },
          opacity: function(context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            return value == 0 ? 0 : 1;
          }
        },
      }
    };
    public pieChartLabels: Label[] = [];
    public pieChartData: number[] = [];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [pluginDataLabels];
    public pieChartColors = [
      {
        backgroundColor: ['#3366CC', '#DC3912', '#FF9900', '#109618', '#990099',
        '#3B3EAC', '#0099C6', '#DD4477', '#66AA00', '#B82E2E',
        '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC',
        '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'],
      },
    ];
  

}

import { Component, OnInit } from '@angular/core';
import { BitcoinService } from 'src/app/services/bitcoin-service';
import { ChartType } from 'angular-google-charts';

@Component({
  selector: 'stats-page',
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss']
})
export class StatsPageComponent implements OnInit {

  constructor(private bitcoinService: BitcoinService) { }
  mktPriceData: any
  mktPriceTitle: string
  confirmedTransData: any
  confirmedTransTitle: string

  chartMktPrice = {
    title: 'Test Chart',
    type: ChartType.AreaChart,
    data: [],
    columnNames: ['Element', 'Density'],
    options: {
      titleColor: 'white',
      colors: ['lightgreen'],
      backgroundColor: '#242431',
      vAxis: {
        gridlines: { count: 6 },
        textStyle: {color: 'white'}
       },
     hAxis: {
       
        gridlines: { count: 6 },
        textStyle: {color: 'white'}
       },
    }
  };

  chartConfirmedTrans = {
    title: 'Test Chart',
    type: ChartType.LineChart,
    data: [],
    columnNames: ['Element', 'Density'],
    options: {
      titleColor: 'white',
      colors: ['pink'],
      backgroundColor: '#242431',
      vAxis: {
        color: 'white',
        //  gridlines: { color: 'transparent' },
        gridlines: { count: 6 },
         textStyle: {color: 'white'}
        },
      hAxis: {
        //  gridlines: { color: 'transparent' },
        gridlines: { count: 6 },
         textStyle: {color: 'white'}
        },

    }
  };


  async ngOnInit(): Promise<void> {
    const mktPrice: any = await this.bitcoinService.getMarketPrice().toPromise()
    this.mktPriceTitle = mktPrice.description
    this.mktPriceData = mktPrice.values.map((value: any) => {
      const values: any = Object.values(value)
      const time: Date = new Date(values[0] * 1000)
      values[0] = time
      return values
    })
    this.chartMktPrice.data = this.mktPriceData
    this.chartMktPrice.title = this.mktPriceTitle
    
    const confirmedTrans: any = await this.bitcoinService.getConfirmedTransactions().toPromise()
    this.confirmedTransTitle = confirmedTrans.description
    this.confirmedTransData = confirmedTrans.values.map((value: any) => {
      const values: any = Object.values(value)
      const time: Date = new Date(values[0] * 1000)
      values[0] = time
      return values
    })
    this.chartConfirmedTrans.data = this.confirmedTransData
    this.chartConfirmedTrans.title = this.confirmedTransTitle
  }
}

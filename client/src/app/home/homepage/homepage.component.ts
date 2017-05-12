import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../../core/database.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  private vendors: any[];
  private activePanel: string = "vendors-panel";

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.vendors().subscribe(
      vendors => {
        vendors.forEach( v => v['score_rate'] = Math.round(v['score_rate']*10)/10);
        vendors.forEach( v => v['score_transactions_rate'] = Math.round(v['score_transactions_rate']*10)/10);
        vendors.forEach( v => v['amount'] = Math.round(v['amount']*100)/100);
        vendors.forEach( v => v['impacted_customers'] = _.chain(v['customers_details']).filter(d => d.score > 0).value().length);

        this.vendors = vendors;
      });
  }

}

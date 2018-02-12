import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreweryService } from '../services/brewery.service';
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {
  //temp data
  beer = {
    "id": "iZZRvV",
    "name": "A Toast",
    "nameDisplay": "A Toast",
    "styleId": 37,
    "isOrganic": "N",
    "labels": {
      "icon": "https://s3.amazonaws.com/brewerydbapi/beer/iZZRvV/upload_Kzavzr-icon.png",
      "medium": "https://s3.amazonaws.com/brewerydbapi/beer/iZZRvV/upload_Kzavzr-medium.png",
      "large": "https://s3.amazonaws.com/brewerydbapi/beer/iZZRvV/upload_Kzavzr-large.png"
    },
    "status": "verified",
    "statusDisplay": "Verified",
    "createDate": "2013-11-25 13:46:51",
    "updateDate": "2015-12-17 07:46:54",
    "style": {
      "id": 37,
      "categoryId": 3,
      "category": {
        "id": 3,
        "name": "North American Origin Ales",
        "createDate": "2012-03-21 20:06:45"
      },
      "name": "American-Style Brown Ale",
      "shortName": "American Brown",
      "description": "American brown ales range from deep copper to brown in color. Roasted malt caramel-like and chocolate-like characters should be of medium intensity in both flavor and aroma. American brown ales have evident low to medium hop flavor and aroma, medium to high hop bitterness, and a medium body. Estery and fruity-ester characters should be subdued. Diacetyl should not be perceived. Chill haze is allowable at cold temperatures.",
      "ibuMin": "25",
      "ibuMax": "45",
      "abvMin": "4",
      "abvMax": "6.4",
      "srmMin": "15",
      "srmMax": "26",
      "ogMin": "1.04",
      "fgMin": "1.01",
      "fgMax": "1.018",
      "createDate": "2012-03-21 20:06:46",
      "updateDate": "2015-04-07 15:27:35"
    }

  }

  constructor(
    private _service: BreweryService,
    private _snackbar: MatSnackBar,
    public viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //get parameter from url, should be used for service call vith search option
    //unable to call services because of CORS setup from web api
    this.activatedRoute.params.subscribe((params: Params) => {
      let text = params['id'];
      console.log('beer' + text);
    });

  }

}

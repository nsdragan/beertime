import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../services/brewery.service';
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  displayedColumns = ['position', 'name', 'description', 'year'];
  dataSource = ELEMENT_DATA;

  beers;

  errorReceived;
  config;
  errorSubscription: Subscription;
  beersSubscription: Subscription;

  constructor(
    private _service: BreweryService,
    private _snackbar: MatSnackBar,
    public viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this._service.errorEmitter.subscribe(error => {
      this.errorHandler(error);
    })

    this._service.beersEmitter.subscribe(data => {
      this.beers = data;
    })

    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.verticalPosition = 'bottom';

    //this.getBeers();

    //temporary data
    this.beers = [
      {
        name: 'name 1',
        category: 'category 1',
        description: 'description',
        availability: 'available 1'
      },
      {
        name: 'name 12',
        category: 'category 2',
        description: 'description 2',
        availability: 'available 2'
      },
      {
        name: 'name 3',
        category: 'category 3',
        description: 'description 3',
        availability: 'available 3'
      },
      {
        name: 'name 4',
        category: 'category 4',
        description: 'description 4',
        availability: 'available 4'
      },
      {
        name: 'name 5',
        category: 'category 5',
        description: 'description 5',
        availability: 'available 5'
      }
    ]
  }

  //getBeers() {
  //  this.beersSubscription = this._service.getBeers().subscribe(data => {
  //    this.beers = data;
  //    this.beersSubscription.unsubscribe()
  //  })
  //}

  errorHandler(msg) {
    this._snackbar.open(msg, 'Ok', this.config);
  }
}



export interface Element {
  name: string;
  position: number;
  description: string;
  year: number;
}

const ELEMENT_DATA: Element[] = [

  { position: 1, name: 'Beer 1', description: 'description 1', year: 2018 },
  { position: 2, name: 'Beer 2', description: 'description 2', year: 2018 },
  { position: 3, name: 'Beer 3', description: 'description 3', year: 2017 }
];

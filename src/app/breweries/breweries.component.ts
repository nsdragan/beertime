import { Component, OnInit } from '@angular/core';
import { BreweryService } from '../services/brewery.service';
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {
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
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.verticalPosition = 'bottom';

    this.getBeers();
  }

  getBeers() {
    this.beersSubscription = this._service.getBeers().subscribe(data => {
      this.beers = data;
      this.beersSubscription.unsubscribe()
    })
  }

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

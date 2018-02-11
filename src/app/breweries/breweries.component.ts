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
  displayedColumns = ['name', 'established', 'statusDisplay'];
  //dataSource = ELEMENT_DATA;

  breweries = [];

  errorReceived;
  config;
  errorSubscription: Subscription;
  breweriesSubscription: Subscription;

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

    //this.getBeers();

    //temporary data
    this.breweries = [
      {
        name: 'name 1',
        established: 'established 1',
        statusDisplay: 'statusDisplay 1'
      },
      {
        name: 'name 12',
        established: 'established 2',
        statusDisplay: 'statusDisplay 2'
      },
      {
        name: 'name 3',
        established: 'established 3',
        statusDisplay: 'statusDisplay 3'
      },
      {
        name: 'name 4',
        established: 'established 4',
        statusDisplay: 'statusDisplay 4'
      },
      {
        name: 'name 5',
        established: 'established 5',
        statusDisplay: 'statusDisplay 5'
      }
    ]
  }

  getBreweries() {
    this.breweriesSubscription = this._service.getBreweries().subscribe(data => {
      this.breweries = data;
      this.breweriesSubscription.unsubscribe()
    })
  }

  errorHandler(msg) {
    this._snackbar.open(msg, 'Ok', this.config);
  }
}



export interface Element {
  name: string;
  established: number;
  statusDisplay: string;
}

//const ELEMENT_DATA: Element[] = [

//  { position: 1, name: 'Beer 1', description: 'description 1', year: 2018 },
//  { position: 2, name: 'Beer 2', description: 'description 2', year: 2018 },
//  { position: 3, name: 'Beer 3', description: 'description 3', year: 2017 }
//];

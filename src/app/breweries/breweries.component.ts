import { Component, OnInit, ViewChild } from '@angular/core';
import { BreweryService } from '../services/brewery.service';
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar, MatSnackBarConfig, MatTableDataSource, MatSort } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {
  displayedColumns = ['name', 'established', 'statusDisplay'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
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
    //subscribe to error emitter
    this._service.errorEmitter.subscribe(error => {
      this.errorHandler(error);
    })
    //configure material snack
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.verticalPosition = 'bottom';

    //this.getBreweries();
    
  }

  ngAfterViewInit() {
    //table sorting
    this.dataSource.sort = this.sort;
  }
  //service call
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
  established: string;
  statusDisplay: string;
}
//temp data for table
const ELEMENT_DATA: Element[] = [
  {
    name: 'FREEDOM Craft Brewery',
    established: '2012',
    statusDisplay: 'Verified'
  },
  {
    name: '(512) Brewing Company',
    established: '2008',
    statusDisplay: 'Verified'
  },
  {
    name: 'Chodsky pivovarek na Morave',
    established: '2007',
    statusDisplay: 'Verified'
  },
  {
    name: '101 Brewing',
    established: '2012',
    statusDisplay: 'Verified'
  },
  {
    name: 'Below Brewing',
    established: '2015',
    statusDisplay: 'Verified'
  }
];

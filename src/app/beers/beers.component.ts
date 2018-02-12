import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreweryService } from '../services/brewery.service';
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar, MatSnackBarConfig, MatTableDataSource, MatSort } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {
  displayedColumns = ['name', 'category', 'description', 'availability'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  beers;
  text;
  errorReceived;
  config;
  errorSubscription: Subscription;
  beersSubscription: Subscription;

  constructor(
    private _service: BreweryService,
    private _snackbar: MatSnackBar,
    public viewContainerRef: ViewContainerRef,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    //subscribe to error emitter
    this._service.errorEmitter.subscribe(error => {
      this.errorHandler(error);
    })

    this._service.beersEmitter.subscribe(data => {
      //set data from service
      this.beers = data;
    })

    this._activatedRoute.params.subscribe((params: Params) => {
      //get parameter value from url
      this.text = params['search'];
      if (this.text) {
        this.getBeers();
      }
    });
    //configure material snack
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.verticalPosition = 'bottom';

    //this.getBeers();

  }

  ngAfterViewInit() {
    //table sort
    this.dataSource.sort = this.sort;
  }
  //call service to get data
  getBeers() {
    this.beersSubscription = this._service.getBeers(this.text).subscribe(data => {
      this.beers = data;
      this.beersSubscription.unsubscribe()
    })
  }

  errorHandler(msg) {
    this._snackbar.open(msg, 'Ok', this.config);
  }
  //redirect to details page
  redirect() {
    this._router.navigate(['/beerdetails'])
  }
}

export interface Element {
  name: string;
  category: string;
  description: string;
  availability: string;
}
//temp data
const ELEMENT_DATA: Element[] = [

  {
    name: 'Imperial IPA 2',
    category: 'British Origin Ales',
    description: "Hop Heads this one's for you!",
    availability: 'Available'
  },
  {
    name: 'Baltic-Style Porter',
    category: 'Other Lager',
    description: 'A robust porter style ale with a twist.',
    availability: 'Available'
  },
  {
    name: 'Double Brown',
    category: 'North American Origin Ales',
    description: 'Caramel. Walnut. Toast. Luxury.',
    availability: 'Available'
  },
  {
    name: 'American-Style Pale Ale',
    category: 'North American Origin Ales',
    description: 'American pale ales range from deep golden to copper',
    availability: 'Available'
  },
  {
    name: 'Golden Lager',
    category: 'Lager',
    description: 'Golden or Blonde ales are straw to golden blonde',
    availability: 'Available'
  }
];

import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { BreweryService } from '../services/brewery.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  categoriesSubscription: Subscription;
  beerSubscription: Subscription;
  categories;
  config;
  //temp data
  items = [
    {
      name: 'British Origin Ales',
      id: 1
    },
    {
      name: 'Irish Origin Ales',
      id: 2
    },
    {
      name: 'German Origin Ales',
      id: 3
    },
    {
      name: 'International Ale Styles',
      id: 4
    },
    {
      name: 'Other Lager',
      id: 5
    },
  ]

  constructor(
    private _service: BreweryService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this._service.errorEmitter.subscribe(error => {
      this.errorHandler(error);
    })
    this.config = new MatSnackBarConfig();
    this.config.duration = 5000;
    this.config.horizontalPosition = 'center';
    this.config.verticalPosition = 'bottom';

    //this.getCategories();
  }

  ngAfterViewInit() {
    this.getCategories();
  }
  //service call to et categories
  getCategories() {
    this.categoriesSubscription = this._service.getCategories().subscribe(data => {
      this.categories = data;
      this.categoriesSubscription.unsubscribe()
    })
  }
  //on category click
  categorySelected(event, id) {
    this.beerSubscription = this._service.getBeers(id).subscribe(data => {
      this.categoriesSubscription.unsubscribe()
    })
  }

  errorHandler(msg) {
    this._snackbar.open(msg, 'Ok', this.config);
  }
}

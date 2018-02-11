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
  items = [
    {
      name: 'category 1',
      id: 1
    },
    {
      name: 'category 2',
      id: 2
    },
    {
      name: 'category 3',
      id: 3
    },
    {
      name: 'category 4',
      id: 4
    },
    {
      name: 'category 5',
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
  }

  getCategories() {
    this.categoriesSubscription = this._service.getCategories().subscribe(data => {
      this.categories = data;
      this.categoriesSubscription.unsubscribe()
    })
  }

  categorySelected(event, id) {
    this.beerSubscription = this._service.getBeers(id).subscribe(data => {
      this.categoriesSubscription.unsubscribe()
    })
  }

  errorHandler(msg) {
    this._snackbar.open(msg, 'Ok', this.config);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BreweryService } from '../services/brewery.service';
import { Subscription } from "rxjs/Subscription";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  constructor(
    private _service: BreweryService,
    private _snackbar: MatSnackBar,
    public viewContainerRef: ViewContainerRef,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let text = params['id'];
      console.log('beer' + text);
    });

  }

}

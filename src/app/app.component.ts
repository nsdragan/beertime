import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Beer time';
  text = '';
  constructor(private _router: Router) { }
  //redirects to breweries page on click
  redirect() {
    this._router.navigate(['/breweries']);
  }
  //redirects to beers page with search parameter
  search() {
    if (this.text != '') {
      this._router.navigate(['/beers/' + this.text])
    }
  }
  //gathering data from input
  onKey(event) {
    this.text = event.target.value;
  }
}

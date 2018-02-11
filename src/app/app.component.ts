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
  constructor(private _router: Router){}
  redirect() {
    this._router.navigate(['/breweries']);
  }
  search() {
    console.log('srch');
    console.log(this.text)
    if (this.text != '') {
      this._router.navigate(['/beers/' + this.text])
    }
  }

  onKey(event) {
    this.text = event.target.value;
  }
}

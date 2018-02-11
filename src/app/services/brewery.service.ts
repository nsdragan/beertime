import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from "@angular/router";

@Injectable()
export class BreweryService {

  private _url: string;
  private _key: string;
  @Output() errorEmitter: EventEmitter<any> = new EventEmitter();
  @Output() beersEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private _http: Http, private router: Router) {
    this._url = environment.apiUrl;
    this._key = environment.apiKey;
  }

  getCategories(): Observable<string[]> {
    return this._http.get(this._url + 'categories' + this._key)
      .map(data => { return data.json() })
      .catch(error => {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.errorEmitter.emit(errMsg);
        return Observable.throw(errMsg);
      });
  }

  getBeers(categoryId): Observable<string[]> {
    return this._http.get(this._url + '/brewery/:' + categoryId + '/beers' + this._key)
      .map(data => {
        this.beersEmitter.emit(data.json());
        this.router.navigate(['/beers']);
      })
      .catch(error => {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.errorEmitter.emit(errMsg);
        console.log(this.router.url);
        this.router.navigate(['/beers']);
        return Observable.throw(errMsg);
      });
  }

  getBreweries(): Observable<string[]> {
    return this._http.get(this._url + '/breweries' + this._key)
      .map(data => {
        this.beersEmitter.emit(data.json());
      })
      .catch(error => {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.errorEmitter.emit(errMsg);
        return Observable.throw(errMsg);
      });
  }
}

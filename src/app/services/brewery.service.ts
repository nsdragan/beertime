import { Http, Response } from '@angular/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class BreweryService {

  private _url: string;
  private _key: string;
  @Output() errorEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private _http: Http) {
    this._url = environment.apiUrl;
    this._key = environment.apiKey;
  }

  getBeers(): Observable<string[]> {
    return this._http.get(this._url + 'beers' + this._key)
      .map(data => { return data.json() })
      .catch(error => {
        let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        this.errorEmitter.emit(errMsg);
        return Observable.throw(errMsg);
      });
  }
}

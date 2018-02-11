import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}

export interface Element {
  name: string;
  position: number;
  description: string;
  year: number;
}

const ELEMENT_DATA: Element[] = [

  { position: 1, name: 'Beer 1', description: 'description 1', year: 2018 },
  { position: 2, name: 'Beer 2', description: 'description 2', year: 2018 },
  { position: 3, name: 'Beer 3', description: 'description 3', year: 2017 }
];

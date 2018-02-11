import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}

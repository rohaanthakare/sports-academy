import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-list',
  templateUrl: './core-list.component.html',
  styleUrls: ['./core-list.component.scss']
})
export class CoreListComponent implements OnInit {
  sourceData = [{
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    category: 'Accessories',
    quantity: 24
  }, {
    code: 'nvklal433',
    name: 'Black Watch',
    category: 'Accessories',
    quantity: 34
  }, {
    code: 'zz21cz3c1',
    name: 'Blue Band',
    category: 'Fitness',
    quantity: 32
  }, {
    code: '244wgerg2',
    name: 'Blue T-Shirt',
    category: 'Clothing',
    quantity: 12
  }];
  constructor() { }

  ngOnInit(): void {
  }

}

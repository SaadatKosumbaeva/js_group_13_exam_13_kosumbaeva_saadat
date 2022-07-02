import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.sass']
})
export class PlaceComponent implements OnInit {
  @Input() place!: Place;

  constructor() { }

  ngOnInit(): void {
  }

  remove() {

  }
}

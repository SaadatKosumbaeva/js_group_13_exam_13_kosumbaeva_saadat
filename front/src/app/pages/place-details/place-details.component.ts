import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.sass']
})
export class PlaceDetailsComponent implements OnInit {
  ratesArray = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit(): void {
  }

  onReviewSubmit() {

  }

  onImageUpload() {

  }

  remove() {

  }

  removeReview() {

  }
}

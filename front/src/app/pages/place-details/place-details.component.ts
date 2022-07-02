import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Place } from '../../models/place.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { ActivatedRoute } from '@angular/router';
import { createReviewRequest, fetchPlaceRequest, uploadImageRequest } from '../../store/places/places.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-place-details',
  templateUrl: './place-details.component.html',
  styleUrls: ['./place-details.component.sass']
})
export class PlaceDetailsComponent implements OnInit, OnDestroy {
  @ViewChild('reviewForm') reviewForm!: NgForm;
  @ViewChild('imageForm') imageForm!: NgForm;

  ratesArray = [1, 2, 3, 4, 5];
  place: Observable<Place | null>;
  placeSub!: Subscription;
  placeData!: Place;
  fetchLoading: Observable<boolean>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.place = store.select(state => state.places.item);
    this.fetchLoading = store.select(state => state.places.fetchPersonalLoading);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchPlaceRequest({id: params['id']}));
    });

    this.placeSub = this.place.subscribe(place => {
      if (place) {
        this.placeData = place;
        console.log(this.placeData);
      }
    })
  }

  onReviewSubmit() {
    this.store.dispatch(createReviewRequest({data: this.reviewForm.value, id: this.placeData._id}));
  }

  onImageUpload() {
    this.store.dispatch(uploadImageRequest({data: this.reviewForm.value, id: this.placeData._id}));
  }

  remove() {

  }

  removeReview() {

  }

  ngOnDestroy(): void {
    this.placeSub.unsubscribe();
  }
}

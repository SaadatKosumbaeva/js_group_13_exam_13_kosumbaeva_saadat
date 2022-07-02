import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.sass']
})
export class EditPlaceComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}

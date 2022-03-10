import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') form!: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}

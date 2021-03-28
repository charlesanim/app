/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Platforms } from 'libs/data-models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  @Input() loading = false;
  @Input() platforms: Platforms[];
  submitted = false;
  @Output() searchGames = new EventEmitter<string>();
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      gameName: [''],
      platformId: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
  }
}

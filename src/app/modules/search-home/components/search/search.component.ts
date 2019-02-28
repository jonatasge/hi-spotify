import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Select } from '@interfaces/select.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  @Input() searchOptions?: Select[];
  @Input() searchResults?: any;
  searchForm: FormGroup;
  @Output() searchSubmit = new EventEmitter();

  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.searchForm = this.formBuilder.group({
      searchType: [this.getSelectedOption(), Validators.required],
      searchText: [null, Validators.required]
    });
  }

  getSelectedOption() {
    let selectedOption;
    this.searchOptions.forEach(option => {
      if (option.selected) {
        selectedOption = option.value;
      }
    });
    return selectedOption;
  }

  submitForm() {
    this.searchSubmit.emit(this.searchForm.value);
  }

  showResult() {
    if (this.searchResults instanceof Array) {
      return this.searchResults;
    } else if (this.searchResults) {
      console.log(this.searchResults);
      if (this.searchResults.artists) {
        return this.searchResults.artists.items;
      } else if (this.searchResults.albums) {
        return this.searchResults.albums.items;
      } else if (this.searchResults.tracks) {
        return this.searchResults.tracks.items;
      }
    }
  }
}

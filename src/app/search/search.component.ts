import { Component, Input, OnInit } from '@angular/core';
import { SearchOptions } from '../search/searchoption';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchOptions?: SearchOptions[];
  selectedOption: string;
  submitted = false;

  ngOnInit() {
    this.getSelectedOption();
  }

  getSelectedOption() {
    this.searchOptions.forEach(option => {
      if (option.selected) {
        this.selectedOption = option.value;
      }
    });
  }

  onSubmit(f: NgForm) {
    this.submitted = true;
  }
}

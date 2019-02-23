import { Component, Input, OnInit } from '@angular/core';
import { Select } from '../../interfaces/select';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchOptions?: Select[];
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

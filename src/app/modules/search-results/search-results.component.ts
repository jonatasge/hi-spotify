// ANGULAR
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// ANGULAR MATERIAL
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';

// SERVICES
import { SpotifyService } from '@services/spotify/spotify.service';

// INTERFACES
import { Select } from '@interfaces/select.interface';

// COMPONENTS
import { DetailsComponent } from './components/details/details.component';

@Component({
  selector: 'app-search-results',
  styleUrls: [
    '../../shared/components/toolbar/_toolbar.component.scss',
    './_search-results.component.scss'
  ],
  templateUrl: './search-results.component.html'
})
export class SearchResultComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: SpotifyService,
    private bottomSheet: MatBottomSheet
  ) {}

  searchOptions: Select[] = this.apiService.searchOptions;
  selectedOption: string;
  searchText = '';
  searchResults = [''];

  ngOnInit() {
    const dataSearch = this.activatedRoute.queryParams['value'];
    if (dataSearch) {
      this.searchText = decodeURIComponent(dataSearch.searchText);
      this.setSelectedOption(decodeURIComponent(dataSearch.searchType));
      this.searchSubmit(dataSearch);
    }
  }

  setSelectedOption(selectedOption: string) {
    this.searchOptions.forEach(option => {
      if (option.selected) {
        delete option.selected;
      }

      if (option.value === selectedOption) {
        option.selected = true;
      }
    });
    this.selectedOption = selectedOption;
  }

  searchSubmit(dataSearch: any) {
    this.searchResults = [''];
    this.apiService.search(dataSearch).subscribe(
      (results: any) => {
        this.selectedOption = dataSearch.searchType;
        this.mountList(results);
      },
      (error: HttpErrorResponse) => {
        this.apiService.handleError(error, dataSearch);
      }
    );
  }

  mountList(results: any) {
    this.searchResults = results[this.selectedOption + 's'].items;
  }

  getPopularityText(popularity: number): string {
    switch (true) {
      case popularity > 80:
        return 'HOT';
      case popularity > 60:
        return 'COOL';
      case popularity > 30:
        return 'Regular';
      default:
        return 'Underground';
    }
  }

  getArtists(artists: Array<any>, resume: boolean = true): string {
    if (artists.length > 2 && resume) {
      return 'Vários artistas';
    }

    return artists.map(a => a.name).join(', ');
  }

  getDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = parseInt(((durationMs % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  openDetails(id?: string, type?: string) {
    const item = this.findItem(this.searchResults, { id });
    this.bottomSheet.open(DetailsComponent, { data: { item, id, type } });
  }

  findItem(arr: Array<any>, parameter: object) {
    let response;
    const key = Object.keys(parameter)[0];

    arr.forEach(item => {
      if (item[key] === parameter[key]) {
        response = item;
      }
    });

    return response;
  }
}

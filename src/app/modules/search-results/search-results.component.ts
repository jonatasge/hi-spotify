// ANGULAR
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// SERVICES
import { SpotifyService } from '@services/spotify/spotify.service';
// INTERFACES
import { Select } from '@interfaces/select.interface';

@Component({
  selector: 'app-search-results',
  styleUrls: [
    '../../shared/components/toolbar/_toolbar.component.scss',
    './_search-results.component.scss'
  ],
  templateUrl: './search-results.component.html'
})
export class SearchResultComponent {
  constructor(private apiService: SpotifyService) {}

  searchOptions: Select[] = [
    { value: 'artist', label: 'Artista' },
    { value: 'album', label: 'Álbum' },
    { value: 'track', label: 'Faixa', selected: true }
  ];
  searchResults: any;

  searchSubmit(response: any) {
    this.apiService.search(response).subscribe(
      (result: any) => {
        this.searchResults = result;
      },
      (error: HttpErrorResponse) => {
        this.apiService.handleError(error, response);
      }
    );
  }
}

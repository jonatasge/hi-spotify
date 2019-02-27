// ANUGLAR
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// SERVICES
import { SpotifyService } from './services/spotify/spotify.service';
// INTERFACES
import { Select } from './interfaces/select.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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

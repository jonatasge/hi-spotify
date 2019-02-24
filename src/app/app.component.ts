import { Component } from '@angular/core';
import { Select } from './interfaces/select.interface';
import { SpotifyService } from './services/spotify.service';

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

  searchSubmit(response: any) {
    this.apiService.search(response);
  }
}

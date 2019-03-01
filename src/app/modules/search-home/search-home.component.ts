// ANGULAR
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// SERVICES
import { SpotifyService } from '@services/spotify/spotify.service';

// INTERFACES
import { Select } from '@interfaces/select.interface';

@Component({
  selector: 'app-search-home',
  styleUrls: ['./_search-home.component.scss'],
  templateUrl: './search-home.component.html'
})
export class SearchHomeComponent {
  constructor(private apiService: SpotifyService, private router: Router) {}

  searchOptions: Select[] = [
    { value: 'artist', label: 'Artista' },
    { value: 'album', label: 'Álbum' },
    { value: 'track', label: 'Faixa', selected: true }
  ];

  searchSubmit(dataSearch: any) {
    this.router.navigate(['/results'], { queryParams: dataSearch, skipLocationChange: true });
    // this.apiService.search(dataSearch).subscribe(
    //   (result: any) => {
    //     this.router.navigate(['/results']);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.apiService.handleError(error, dataSearch);
    //   }
    // );
  }
}

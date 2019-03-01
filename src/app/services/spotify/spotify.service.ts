// ANGULAR
import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
// ANGULAR MATERIAL
import { MatSnackBar } from '@angular/material';
// RxJS
import { Observable } from 'rxjs';
// SERVICES
import { SpotifyAuthenticateService } from './spotify-authenticate.service';
import { HelpService } from '@services/helpers/help.service';
// INTERFACES
import { Config } from '@interfaces/config.interface';

@Injectable()
export class SpotifyService implements OnInit {
  constructor(
    private authenticate: SpotifyAuthenticateService,
    private http: HttpClient,
    private help: HelpService,
    private snackbar: MatSnackBar
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authenticate.getToken()
      })
    };
  }

  config: Config = {};
  httpOptions = {};
  searchOptions = [
    { value: 'artist', label: 'Artista' },
    { value: 'album', label: 'Álbum' },
    { value: 'track', label: 'Faixa', selected: true }
  ];

  ngOnInit() {
    const dataSearch = JSON.parse(localStorage.getItem('continue_searching'));

    if (dataSearch) {
      this.search(dataSearch).subscribe(
        r => console.log(r),
        (error: HttpErrorResponse) => {
          this.handleError(error, dataSearch);
        }
      );
    }
  }

  handleError(error: HttpErrorResponse, dataSearch?: object) {
    localStorage.setItem('continue_searching', JSON.stringify(dataSearch));
    this.authenticate.handleError(error);
    this.snackbar.open(
      'Parece que algo deu errado. Por favor, tente novamente mais tarde.',
      'OK'
    );
  }

  search(dataSearch: object): Observable<object> {
    const config = this.authenticate.config.API_ENDPOINTS['SPOTIFY'].query
      .search;
    const search = this.help.obj.clone(config);

    const parameters = search['parameters'];
    parameters.q = dataSearch['searchText'];
    parameters.type = dataSearch['searchType'];

    return this.http.get(
      this.help.url.mountURL(config, search, parameters),
      this.httpOptions
    );
  }

  getArtistAlbums(id: string) {
    const config = this.authenticate.config.API_ENDPOINTS['SPOTIFY'].query.get_artist_albums;
    const getArtistAlbums = this.help.obj.clone(config);

    const parameters = getArtistAlbums['parameters'];
    parameters.id = {
      type: 'path',
      value: id
    };

    return this.http.get(
      this.help.url.mountURL(config, getArtistAlbums, parameters),
      this.httpOptions
    );
  }

  getAlbumTracks(id: string) {
    const config = this.authenticate.config.API_ENDPOINTS['SPOTIFY'].query.get_album_tracks;
    const getAlbumTracks = this.help.obj.clone(config);

    const parameters = getAlbumTracks['parameters'];
    parameters.id = {
      type: 'path',
      value: id
    };

    return this.http.get(
      this.help.url.mountURL(config, getAlbumTracks, parameters),
      this.httpOptions
    );
  }

  getDuration(durationMs: number): string {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = parseInt(((durationMs % 60000) / 1000).toFixed(0));
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
}

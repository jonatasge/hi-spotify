import { Component, Input } from '@angular/core';
import { SearchOptions } from './SearchOptions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchOptions: SearchOptions[] = [
    { value: "artist", viewValue: "Artista" },
    { value: "album", viewValue: "Álbum" },
    { value: "track", viewValue: "Faixa" }
  ];
}

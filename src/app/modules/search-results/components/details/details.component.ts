// ANGULAR
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

// ANGULAR MATERIAL
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

// SERVICE
import { SpotifyService } from '@services/spotify/spotify.service';

@Component({
  selector: 'app-details',
  styleUrls: ['./_details.component.scss'],
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private detailsComponentRef: MatBottomSheetRef<DetailsComponent>,
    private changeDetectorRef: ChangeDetectorRef,
    private apiService: SpotifyService
  ) {}

  items = [''];

  ngOnInit() {
    if (this.data.type === 'artist') {
      this.apiService.getArtistAlbums(this.data.id).subscribe(
        (results: any) => {
          this.items = results.items;
          this.changeDetectorRef.markForCheck();
        },
        (error: HttpErrorResponse) => {
          this.apiService.handleError(error, this.data);
        }
      );
    } else if (this.data.type === 'album') {
      this.apiService.getAlbumTracks(this.data.id).subscribe(
        (results: any) => {
          this.items = results.items;
          this.changeDetectorRef.markForCheck();
        },
        (error: HttpErrorResponse) => {
          this.apiService.handleError(error, this.data);
        }
      );
    }
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
}

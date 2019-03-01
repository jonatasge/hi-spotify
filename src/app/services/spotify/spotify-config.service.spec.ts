/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyConfigService } from './spotify-config.service';

describe('Service: SpotifyConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyConfigService]
    });
  });

  it('should ...', inject([SpotifyConfigService], (service: SpotifyConfigService) => {
    expect(service).toBeTruthy();
  }));
});

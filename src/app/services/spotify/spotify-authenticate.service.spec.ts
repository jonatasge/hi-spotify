/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotifyAuthenticateService } from './spotify-authenticate.service';

describe('Service: SpotifyAuthenticate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAuthenticateService]
    });
  });

  it('should ...', inject([SpotifyAuthenticateService], (service: SpotifyAuthenticateService) => {
    expect(service).toBeTruthy();
  }));
});

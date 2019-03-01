// ANGULAR
import { Injectable } from '@angular/core';
// VENDOR
import { ConfigService } from 'ngx-envconfig';
// INTERFACES
import { Config } from '@interfaces/config.interface';

@Injectable()
export class SpotifyConfigService {
  constructor(private configService: ConfigService) {}

  public config: Config = {
    HOST_API: this.configService.get('HOST_API'),
    API_AUTHORIZE: this.configService.get('API_AUTHORIZE'),
    API_ENDPOINTS: {
      SPOTIFY: this.configService.get('API_ENDPOINTS').SPOTIFY
    }
  };
}

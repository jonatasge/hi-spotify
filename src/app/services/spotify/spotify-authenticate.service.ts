// ANGULAR
import { Injectable, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
// SERVICES
import { SpotifyConfigService } from './spotify-config.service';
import { HelpService } from '../helpers/help.service';

@Injectable()
export class SpotifyAuthenticateService implements OnInit {
  constructor(
    private apiConfig: SpotifyConfigService,
    private help: HelpService
  ) {}

  config = this.apiConfig.config;

  ngOnInit() {
    this.getToken();
  }

  getApiAuthorization() {
    const endpoint = this.config.API_ENDPOINTS['SPOTIFY'];
    const scheme = endpoint.query.authorize;

    const query = this.help.obj.clone(scheme);
    query['url'] = this.config.API_AUTHORIZE;

    const parameters = query['parameters'];
    parameters.client_id = endpoint.client_id;

    localStorage.setItem('get_new_token', 'true');

    window.location.href = this.help.url.mountURL(scheme, query, parameters);
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.getApiAuthorization();
    }
  }

  tokenStillValid(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      const expires = localStorage.getItem('token_expires_in');
      const expiresIn = new Date(expires).getTime();
      const now = new Date().getTime();

      if (now <= expiresIn) {
        return true;
      }
    }

    return false;
  }

  getTokenFromURL() {
    localStorage.removeItem('get_new_token');

    if (window.location.hash) {
      const url = new URL(window.location.href.replace('#', '?'));
      const token = url.searchParams.get('access_token');

      const expires = url.searchParams.get('expires_in');
      const dateExpires = new Date().setSeconds(parseInt(expires, 0));
      const expiresIn = new Date(dateExpires).toString();

      localStorage.setItem('token', token);
      localStorage.setItem('token_expires_in', expiresIn);

      return token;
    } else {
      return undefined;
    }
  }

  getToken() {
    if (!this.tokenStillValid()) {
      if (!localStorage.getItem('get_new_token')) {
        this.getApiAuthorization();
      } else {
        return this.getTokenFromURL();
      }
    } else {
      if (!localStorage.getItem('get_new_token')) {
        return localStorage.getItem('token');
      } else {
        return this.getTokenFromURL();
      }
    }
  }
}

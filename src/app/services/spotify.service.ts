import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from 'ngx-envconfig';
import { Config } from '../interfaces/config.interface';
import { Endpoint } from '../interfaces/endpoint.interface';
import { Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';

@Injectable()
export class SpotifyService {
  constructor(private http: HttpClient, private configService: ConfigService) {
    this.config = {
      HOST_API: this.configService.get('HOST_API'),
      API_AUTHORIZE: this.configService.get('API_AUTHORIZE'),
      API_ENDPOINTS: {
        SPOTIFY: this.configService.get('API_ENDPOINTS')['SPOTIFY']
      },
      TOKEN: this.configService.get('TOKEN')
    };

    if (!this.config.TOKEN) {
      this.getApiAuthorization();
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.config.TOKEN
      })
    };
  }

  config: Config = {};
  httpOptions = {};

  parameterIsRequired(parameters: object, parameter: string | number): boolean {
    return (
      parameters[parameter] === true || // (Se no "parameters" o parametro é requirido ou
      (parameters[parameter] instanceof Object && // Se esse parametro é um objeto e
      !(parameters[parameter] instanceof Array) && // Se esse parametro não é um array e
        parameters[parameter].required)
    ); // Se tem a chave "required" e ela é igual a true)
  }

  parameterIsInvalid(parameters: object, parameter: string | number): boolean {
    return (
      (parameters[parameter] instanceof Object && // (Se no "parameters" o parametro é um objeto e
      !(parameters[parameter] instanceof Array) && // Se esse parametro não é um array e
        !parameters[parameter].value) || // tem chave "value" preenchida) ou
      !parameters[parameter]
    ); // Se no "parameters" esse paremetro é preenchido com string, number ou boolean
  }

  mountURL(config: object, endpoint: Endpoint, parameters: object): string {
    let url =
      (endpoint.url ? endpoint.url : this.config.HOST_API) +
      endpoint.path +
      '?';

    Object.keys(endpoint.parameters).map(key => {
      // Se o parametro é obrigatorio & Se o parametro não é fornecido
      if (
        this.parameterIsRequired(config['parameters'], key) &&
        this.parameterIsInvalid(endpoint.parameters, key)
      ) {
        if (endpoint.parameters[key].value) {
          parameters[key] = encodeURIComponent(endpoint.parameters[key].value);
        } else {
          console.error('Parameter "' + key + '" is required.');
          parameters[key] = '';
        }
      } else {
        let parameter = '';
        switch (typeof parameters[key]) {
          case 'string':
            parameter = parameters[key];
            break;
          case 'object':
            parameter = parameters[key].value;
            break;
          default:
            break;
        }

        parameters[key] = encodeURIComponent(parameter);
      }

      if (parameters[key] !== '') {
        url += '&' + key + '=' + parameters[key];
      }
    });

    return url.replace(/\/+/g, '/').replace(':/', '://');
  }

  getApiAuthorization() {
    if (!window.location.hash) {
      const spotify = this.config.API_ENDPOINTS['SPOTIFY'];
      const config = spotify.query.authorize;
      const authorize = this.cloneObject(config);
      const parameters = authorize['parameters'];
      parameters.client_id = spotify.client_id;
      authorize['url'] = this.config.API_AUTHORIZE;

      window.location.href = this.mountURL(config, authorize, parameters);
    } else {
      const url = new URL(window.location.href.replace('#', '?'));
      this.config.TOKEN = url.searchParams.get('access_token');
    }
  }

  search(data: object): Observable<object> {
    const spotify = this.config.API_ENDPOINTS['SPOTIFY'];
    const config = spotify.query.search;
    const search = this.cloneObject(config);
    const parameters = Object.assign({}, search['parameters']);
    parameters.q = data['searchText'];
    parameters.type = data['searchType'];

    return this.http.get(this.mountURL(config, search, parameters));
  }

  cloneObject(obj: object): object {
    const newObj = { ...obj };

    Object.keys(newObj).map(key => {
      if (newObj[key] instanceof Object) {
        newObj[key] = this.cloneObject(obj[key]);
      } else if (newObj[key] instanceof Array) {
        newObj[key] = [...obj[key]];
      }
    });

    return newObj;
  }
}

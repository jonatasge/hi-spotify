// ANGULAR
import { Injectable } from '@angular/core';
// INTERFACES
import { EndpointQuery } from '@interfaces/endpoint-query.interface';
import { SpotifyConfigService } from '@services/spotify/spotify-config.service';

@Injectable()
export class UrlService {
  config;

  constructor(private apiConfig: SpotifyConfigService) {
    this.config = this.apiConfig.config;
  }

  mountURL(
    scheme: EndpointQuery,
    query: EndpointQuery,
    parameters: object
  ): string {
    let url = (query.url ? query.url : this.config.HOST_API) + query.path + '?';

    Object.keys(scheme.parameters).map(parameter => {
      // If the parameter is required & If the parameter is not supplied
      if (
        this.parameterIsRequired(scheme.parameters, parameter) &&
        !this.parameterIsValid(query.parameters, parameter)
      ) {
        if (query.parameters[parameter] || (query.parameters[parameter] && query.parameters[parameter].value)) {
          if (query.parameters[parameter].type !== 'path') {
            parameters[parameter] = encodeURIComponent(
              query.parameters[parameter].value
            );
          } else {
            parameters[parameter].type = 'path';
            parameters[parameter].value = encodeURIComponent(
              query.parameters[parameter].value
            );
          }
        } else {
          console.error('Parameter "' + parameter + '" is required.');
          parameters[parameter] = '';
        }
      } else {
        if (parameters[parameter] !== undefined) {
          let paramet = '';
          switch (typeof parameters[parameter]) {
            case 'string':
              paramet = parameters[parameter];
              break;
            case 'object':
              paramet = parameters[parameter].value;
              break;
            default:
              break;
          }

          if (parameters[parameter].type !== 'path') {
            parameters[parameter] = encodeURIComponent(paramet);
          } else {
            parameters[parameter].value = encodeURIComponent(paramet);
          }
        } else {
          parameters[parameter] = '';
        }
      }

      if (
        !(parameters[parameter] instanceof Object) &&
        parameters[parameter] !== ''
      ) {
        url += '&' + parameter + '=' + parameters[parameter];
      } else if (parameters[parameter].type === 'path') {
        url = url.replace('{' + parameter + '}', parameters[parameter].value);
      }
    });

    return url.replace(/\/+/g, '/').replace(':/', '://');
  }

  parameterIsRequired(parameters: object, parameter: string | number): boolean {
    return (
      parameters[parameter] === true || // (If in the "parameters" the parameter is required or
      (parameters[parameter] instanceof Object && // If this parameter is an object and
      !(parameters[parameter] instanceof Array) && // If this parameter is not an array and
        parameters[parameter].required) // If this parameter is "required" and is equal to true)
    );
  }

  parameterIsValid(parameters: object, parameter: string | number): boolean {
    return (
      parameters[parameter] !== undefined || // (If in the "parameters" the parameter is different from undefined or
      (parameters[parameter] instanceof Object && // (If this parameter is an object and
      !(parameters[parameter] instanceof Array) && // If this parameter is not an array and
        parameters[parameter].value) // has "value" parameter filled)
    );
  }
}

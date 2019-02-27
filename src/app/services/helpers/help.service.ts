import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
import { UrlService } from './url.service';

@Injectable()
export class HelpService {
  constructor(public obj: ObjectService, public url: UrlService) {}
}

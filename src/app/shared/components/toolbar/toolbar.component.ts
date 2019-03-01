import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent {}

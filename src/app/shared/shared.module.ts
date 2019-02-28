// ANGULAR
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// ANGULAR MATERIAL
import {
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule
} from '@angular/material';

// COMPONENTS
import { BgAnimationComponent } from './components/bg-animation/bg-animation.component';
import { LogoComponent } from './components/logo/logo.component';
import { SearchComponent } from './components/search/search.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  declarations: [
    BgAnimationComponent,
    LogoComponent,
    SearchComponent,
    ToolbarComponent
  ],
  exports: [
    BgAnimationComponent,
    LogoComponent,
    SearchComponent,
    ToolbarComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule {}

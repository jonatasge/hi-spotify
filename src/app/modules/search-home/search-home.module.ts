// ANGULAR
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// ANGULAR MATERIAL
import {
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatCardModule,
  MatButtonModule
} from '@angular/material';

// MODULES
import { SearchRoutingModule } from './search-home-routing.module';

// COMPONENTS
import { SearchHomeComponent } from './search-home.component';
import { SearchComponent } from './components/search/search.component';
import { BgAnimationComponent } from '@components/bg-animation/bg-animation.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [SearchHomeComponent, SearchComponent, BgAnimationComponent]
})
export class SearchHomeModule {}

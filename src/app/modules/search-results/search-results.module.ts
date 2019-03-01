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
  MatButtonModule,
  MatGridListModule,
  MatListModule,
  MatIconModule,
  MatBottomSheetModule
} from '@angular/material';

// MODULES
import { ResultsRoutingModule } from './search-results-routing.module';
import { SharedModule } from '../../shared/shared.module';

// COMPONENTS
import { SearchResultComponent } from './search-results.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ResultsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatBottomSheetModule,
    SharedModule
  ],
  entryComponents: [DetailsComponent],
  declarations: [SearchResultComponent, DetailsComponent]
})
export class SearchResultsModule {}

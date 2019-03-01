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
import { SharedModule } from '@shared/shared.module';

// COMPONENTS
import { SearchHomeComponent } from './search-home.component';

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
    MatButtonModule,
    SharedModule
  ],
  declarations: [SearchHomeComponent]
})
export class SearchHomeModule {}

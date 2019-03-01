import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'search'
  },
  {
    path: 'search',
    component: AppComponent,
    loadChildren: './modules/search-home/search-home.module#SearchHomeModule',
    data: {
      title: 'Searh'
    }
  },
  {
    path: 'results',
    component: AppComponent,
    loadChildren: './modules/search-results/search-results.module#SearchResultsModule',
    data: {
      title: 'Results'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

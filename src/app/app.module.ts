// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ANGULAR - MATERIAL
import {
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';

// VENDORS
import { ConfigModule } from 'ngx-envconfig';
import { environment } from '../../src/environments/environment';

// MY ITEMS
// APP COMPONENT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// OTHERS COMPONENTS
import { BgAnimationComponent } from './components/bg-animation/bg-animation.component';
import { SearchComponent } from './components/search/search.component';
// SERVICES
import { SpotifyService } from './services/spotify.service';

@NgModule({
  declarations: [AppComponent, SearchComponent, BgAnimationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfigModule.forRoot(environment)
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule {}

// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// ANGULAR - MATERIAL
import { MatSnackBarModule } from '@angular/material';

// VENDORS
import { ConfigModule } from 'ngx-envconfig';
import { environment } from '@environments/environment';

// APP COMPONENT
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// SERVICES
import { SpotifyConfigService } from '@services/spotify/spotify-config.service';
import { SpotifyAuthenticateService } from '@services/spotify/spotify-authenticate.service';
import { SpotifyService } from '@services/spotify/spotify.service';
import { HelpService } from '@services/helpers/help.service';
import { ObjectService } from '@services/helpers/object.service';
import { UrlService } from '@services/helpers/url.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConfigModule.forRoot(environment),
    MatSnackBarModule
  ],
  providers: [
    SpotifyConfigService,
    SpotifyAuthenticateService,
    SpotifyService,
    HelpService,
    ObjectService,
    UrlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

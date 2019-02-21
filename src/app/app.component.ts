import { Component } from "@angular/core";
import { SearchOptions } from "./search/searchoptions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "hi-spotify";

  searchOptions: SearchOptions[] = [
    { value: "artist", viewValue: "Artista" },
    { value: "album", viewValue: "Álbum" },
    { value: "track", viewValue: "Faixa" }
  ];
}

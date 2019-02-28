// ANUGLAR
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
// RxJS
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private title: Title) {}

  ngOnInit() {
    this.setPageTitle();
  }

  setPageTitle() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router)
      )
      .subscribe(() => {
        const title = this.getCurrentRouteTitle(
          this.router.routerState,
          this.router.routerState.root
        );

        this.title.setTitle(title[0]);
      });
  }

  getCurrentRouteTitle(state: any, parent: ActivatedRoute) {
    const data = [];

    const routeData =
      parent && parent.snapshot.data && parent.snapshot.data.title
        ? true
        : false;

    if (routeData) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getCurrentRouteTitle(state, state.firstChild(parent)));
    }

    return data;
  }
}

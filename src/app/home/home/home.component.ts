import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(NavigationComponent) navComp: NavigationComponent;
  navigationStatus = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationEnd) {
          this.navComp.onSideBarHide();
        }
      }
    );
  }

  onMenuToggleClicked(event) {
    this.navComp.showNavbar();
  }
}

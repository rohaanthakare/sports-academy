import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/user/services/auth.service';
import { Role, GlobalConstants } from 'src/app/user/models/user.enum';
import { FeatureService } from 'src/app/user/services/feature.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Input() display = false;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private featureService: FeatureService) { }

  ngOnInit(): void {
    if (this.authService.getCurrentUser().active_role === Role.SUPERADMIN) {
      this.menuItems = GlobalConstants.SUPERADMIN_VIEWS
    } else {
      this.featureService.getNavigationFeatures().subscribe(
        data => {
          this.menuItems = data;
        }
      );
      
    }
  }

  onSideBarHide() {
    this.display = false;
  }

  showNavbar() {
    this.display = true;
  }
}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/user/services/auth.service';
import { Role, GlobalConstants } from 'src/app/user/models/user.enum';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Input() display = false;
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.getCurrentUser().active_role === Role.SUPERADMIN) {
      this.menuItems = GlobalConstants.SUPERADMIN_VIEWS
    }
  }

  onSideBarHide() {
    this.display = false;
  }

  showNavbar() {
    this.display = true;
  }
}

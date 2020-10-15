import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/user/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuToggleClicked: EventEmitter<any> = new EventEmitter();
  settings: MenuItem[] = [];
  displayName = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.displayName = this.authService.getCurrentUser().username;
    this.settings = [
      {label: 'Settings', icon: 'pi pi-fw pi-cog'},
      {label: 'Profile', icon: 'pi pi-fw pi-user'},
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
          this.authService.logoutUser();
        }
      }
    ];
  }

  onMenuToggleClick() {
    this.menuToggleClicked.emit();
  }

}

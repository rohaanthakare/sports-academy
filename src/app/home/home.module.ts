import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// PrimeNG Modules
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { ImportDataComponent } from './import-data/import-data.component';

const routes: Routes = [{
  path: '',
  component: DashboardComponent
}, {
  path: 'import-data',
  component: ImportDataComponent
}];

@NgModule({
  declarations: [HomeComponent, HeaderComponent, NavigationComponent, DashboardComponent, ImportDataComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule, PanelModule,
    SidebarModule, ButtonModule, ToolbarModule, MenuModule, PanelMenuModule, ProgressBarModule
  ]
})
export class HomeModule { }

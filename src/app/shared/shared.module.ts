import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

// App Components
import { CoreListComponent } from './components/core-list/core-list.component';
import { CoreFormComponent } from './components/core-form/core-form.component';


@NgModule({
  declarations: [CoreListComponent, CoreFormComponent],
  imports: [
    CommonModule, PanelModule, ProgressBarModule, CardModule, TableModule
  ],
  exports: [CoreListComponent]
})
export class SharedModule { }

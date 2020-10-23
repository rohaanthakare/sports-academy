import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoListComponent } from './components/demo-list/demo-list.component';
import { DemoFormComponent } from './components/demo-form/demo-form.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: 'list',
  component: DemoListComponent
}, {
  path: 'create',
  component: DemoFormComponent
}];

@NgModule({
  declarations: [DemoListComponent, DemoFormComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), SharedModule
  ]
})
export class DemoModule { }

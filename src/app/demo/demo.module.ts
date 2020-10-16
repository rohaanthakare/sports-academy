import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoListComponent } from './components/demo-list/demo-list.component';
import { DemoFormComponent } from './components/demo-form/demo-form.component';



@NgModule({
  declarations: [DemoListComponent, DemoFormComponent],
  imports: [
    CommonModule
  ]
})
export class DemoModule { }

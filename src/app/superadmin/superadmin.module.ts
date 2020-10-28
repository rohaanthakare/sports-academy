import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

import { ImportDataComponent } from './import-data/import-data.component';
import { MailTesterComponent } from './mail-tester/mail-tester.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
  path: 'import-data',
  component: ImportDataComponent
}, {
  path: 'mail-tester',
  component: MailTesterComponent
}];

@NgModule({
  declarations: [ImportDataComponent, MailTesterComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), ReactiveFormsModule,
    ButtonModule, ToolbarModule, PanelModule, ProgressBarModule,
    RadioButtonModule, MessageModule, MessagesModule
  ]
})
export class SuperadminModule { }

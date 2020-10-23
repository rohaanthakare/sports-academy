import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './user/services/auth-guard.service';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [{
  path: 'user',
  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
}, {
  path: 'home',
  component: HomeComponent,
  children: [{
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  }, {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  }],
  canActivate: [ AuthGuardService ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

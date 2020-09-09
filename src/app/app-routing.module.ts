import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {DashboardpageComponent} from './dashboardpage/dashboardpage.component';
import {AuthenticationGuard} from './_guards/authentication.guard';

const routes: Routes = [

  // Main pages
  { path: 'dashboard', component: DashboardpageComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginpageComponent },

  // Redirections
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

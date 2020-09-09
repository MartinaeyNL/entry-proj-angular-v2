import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginpageComponent} from './loginpage/loginpage.component';
import {DashboardpageComponent} from './dashboardpage/dashboardpage.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardpageComponent },
  { path: '**', component: LoginpageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../app/components/sign-in/sign-in.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { HomeComponent } from '../app/components/home/home.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

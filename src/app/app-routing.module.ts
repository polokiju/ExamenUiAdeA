import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/common/home/home.component';
import { LoginComponent } from './modules/common/login/login.component';

const APP_ROUTES: Routes = [
  {path:'Login',component:LoginComponent},
  {path:'Home',component:HomeComponent},
  {path:'**',pathMatch:'full',redirectTo: 'Login'}
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

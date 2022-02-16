import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { SecureAppComponent } from './secured-app.component';

const routes: Routes = [{
  path: '', component: SecureAppComponent,
  children: [
    {path:'home', component:NavComponent},
    {path:'',  redirectTo: 'home', pathMatch: 'full'},
    // TODO: add a 404 component
    {path:'**', redirectTo: 'home', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }

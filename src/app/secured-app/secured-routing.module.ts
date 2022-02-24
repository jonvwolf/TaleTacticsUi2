import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CreateStoryComponent } from './create-story/create-story.component';
import { HomeComponent } from './home/home.component';
import { SecureAppComponent } from './secured-app.component';

const routes: Routes = [{
  path: '', component: SecureAppComponent, canActivate:[AuthGuard],
  children: [
    {path:'home', component:HomeComponent},
    {path:'stories/create', component:CreateStoryComponent},
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

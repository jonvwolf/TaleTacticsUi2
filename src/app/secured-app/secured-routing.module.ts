import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesManagerComponent } from '../files-manager/files-manager.component';
import { AuthGuard } from '../guards/auth.guard';
import { CreateStoryComponent } from './create-story/create-story.component';
import { GameStoryDashboardComponent } from './game-story-dashboard/game-story-dashboard.component';
import { HomeComponent } from './home/home.component';
import { SecureAppComponent } from './secured-app.component';
import { StoryScenesEditorComponent } from './story-scenes-editor/story-scenes-editor.component';
import { UpdateStoryComponent } from './update-story/update-story.component';

const routes: Routes = [{
  path: '', component: SecureAppComponent, canActivate:[AuthGuard],
  children: [
    {path:'home', component:HomeComponent},
    {path:'stories/create', component:CreateStoryComponent},
    {path:'stories/update/:id', component:UpdateStoryComponent},
    {path:'stories/scenes-editor/:id', component:StoryScenesEditorComponent},
    {path:'games/:storyId/:gameCode', component: GameStoryDashboardComponent},
    {path:'files', component: FilesManagerComponent},
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

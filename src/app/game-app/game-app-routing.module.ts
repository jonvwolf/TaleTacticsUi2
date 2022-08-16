import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { htConstants } from '../core/ht-constants';
import { AuthGuard } from '../guards/auth.guard';
import { GameStoryDashboardComponent } from '../secured-app/game-story-dashboard/game-story-dashboard.component';
import { RootGameComponent } from './root-game/root-game.component';

const routes: Routes = [{
  path: '', component: RootGameComponent, canActivate:[AuthGuard],
  children: [
    {path:'games/:storyId/:gameCode', component: GameStoryDashboardComponent},
    {path:'**', redirectTo: htConstants.pathSecuredHomeForRoutes, pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameAppRoutingModule { }

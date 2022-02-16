import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'secured', loadChildren: () => import('src/app/secured-app/secured.module').then(m=>m.SecureModule)},
  {path:'**', redirectTo:'', pathMatch:'full'}
  // TODO: add a 404
];

@NgModule({
  // scrollPositionRestoration: When changing views, it will restore position to top
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

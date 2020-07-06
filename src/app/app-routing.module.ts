import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmoUserComponent } from './components/pmo-user/pmo-user.component';


const routes: Routes = [
  {path: 'adduser', component: PmoUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

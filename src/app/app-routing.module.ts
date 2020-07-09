import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PmoUserComponent } from './components/pmo-user/pmo-user.component';
import { PmoProjectComponent } from './components/pmo-project/pmo-project.component';
import { PmoAddtaskComponent } from './components/pmo-task/pmo-addtask/pmo-addtask.component';


const routes: Routes = [
  {path: 'adduser', component: PmoUserComponent },
  {path: 'project', component: PmoProjectComponent },
  { path: 'addTask', component: PmoAddtaskComponent },
  { path: 'viewTask', component: PmoAddtaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

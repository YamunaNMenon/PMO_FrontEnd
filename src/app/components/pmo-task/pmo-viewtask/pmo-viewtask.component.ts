import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { TaskService } from 'src/app/service/task.service';
import { ProjectService } from 'src/app/service/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pmo-viewtask',
  templateUrl: './pmo-viewtask.component.html',
  styleUrls: ['./pmo-viewtask.component.scss']
})
export class PmoViewtaskComponent implements OnInit {

 /** Task list of view task component */
 taskList: Task[];

 /** Project list of view task component */
 projectList: Project[];

 /** Project search of view task component */
 projectSearch: string;

 /** Search type of view task component */
 searchType = 'taskProject' ;

 /** Search type project of view task component */
 searchTypeProject = 'project';

 /**
  * Creates an instance of view task component.
  * @param taskService TaskService
  * @param projectService ProjectService
  * @param router Router
  */
 constructor(private taskService: TaskService,
             private projectService: ProjectService,
             private router: Router) { }

 /**
  * on init
  */
 ngOnInit(): void {
   this.getAllTasks();
   this.getAllProjects();
 }

 /**
  * Gets all tasks
  */
 getAllTasks(): void{
   this.taskService.getAllTasks().subscribe(data => {
     this.taskList = data;
   });
 }

 /**
  * Gets all projects
  */
 getAllProjects(): void{
   this.projectService.getAllProjects()
     .subscribe(data => {
       this.projectList = data;
     });
 }

 /**
  * Selected row
  * @param project Project
  */
 selectedRow(project: Project): void{
     this.projectSearch = project.project;
 }

 /**
  * Edits task
  * @param task Task
  */
 editTask(task: Task): void  {
   sessionStorage.setItem('currentTask', JSON.stringify(task));
   this.router.navigate(['addTask'], { queryParams: { taskId: task.id } });
 }

 /**
  * Ends task
  * @param task Task
  */
 endTask(task: Task): void {
   task.status = 1;
   this.taskService.addOrUpdateTask(task).subscribe(data => {
     this.getAllTasks();
   });
 }

 /**
  * Sorts task list
  * @param paramName sortBy
  */
 sortTaskList(paramName: string): void {
   switch (paramName) {
     case 'startDate':
       this.taskList = this.taskList.sort((a, b) => {
         return new Date(a.startDate) > new Date(b.startDate) ? -1 : 1;
       });
       break;
     case 'endDate':
       this.taskList = this.taskList.sort((a, b) => {
         return new Date(a.endDate) > new Date(b.endDate) ? -1 : 1;
       });
       break;
     case 'priority':
       this.taskList = this.taskList.sort((a, b) => {
         return a.priority > b.priority ? -1 : 1;
       });
       break;
     case 'Completed':
       this.taskList = this.taskList.sort((a, b) => {
         return a.status > b.status ? -1 : 1;
       });
       break;
   }
 }


}

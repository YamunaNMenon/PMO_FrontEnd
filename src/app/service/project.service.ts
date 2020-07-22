import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { ProjectServiceURLS } from '../constants/serviceURL';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

 /** Base url of project service */
 baseUrl = environment.apiUrl;
 /**
  * Creates an instance of project service.
  * @param http HttpClient
  */
 constructor(private http: HttpClient) { }

 /**
  * Adds or  edit project
  * @param project Project
  * @returns editproject result
  */
 addOrEditProject(project: Project): Observable<any> {
   const addOrEditProjectUrl = this.baseUrl + ProjectServiceURLS.SAVE_OR_UPDATE;
   return this.http.post<Project>(addOrEditProjectUrl, project);
 }

 /**
  * Gets all projects
  * @returns all projects
  */
 getAllProjects(): Observable<any>{
  const getAllProjectsUrl = this.baseUrl +  ProjectServiceURLS.GET_ALL_PROJECTS;
  return this.http.get(getAllProjectsUrl).pipe(
    map((resp: any) => this.getProjectData(resp))
  );
}

 /**
  * Deletes project
  * @param id  ID
  */
 deleteProject(id: string): Observable<any> {
   const deleteProjectUrl = this.baseUrl +  ProjectServiceURLS.DELETE_PROJECT;
   return this.http.delete(`${deleteProjectUrl}/${id}`);
 }
 
 getProjectData(response: any): any {
  const projects: Project[] = [];
  response.forEach(projectElement => {
    const project = {
      project_id: projectElement.project_id,
      project: projectElement.project,
      startDate: projectElement.startDate,
      endDate: projectElement.endDate,
      priority: projectElement.priority,
      id:projectElement.id,
      // user: projectElement.user && projectElement.user.length >0  ? projectElement.user.find(userElement => userElement.manager_check === 1) : {},
      noOfTasks: projectElement.tasks ? projectElement.tasks.length : 0,
      noOfCompletedTask: projectElement.tasks ? projectElement.tasks.find(taskElement => taskElement.status === 1) : 0
    };
    // project.user.id = project.user.user_id;
    projects.push(project);
  });
  return projects;
}
}

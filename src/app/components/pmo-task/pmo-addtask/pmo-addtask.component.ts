import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { ActivatedRoute, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ParentTask, Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/service/project.service';
import { UserService } from 'src/app/service/user.service';
import { TaskService } from 'src/app/service/task.service';


@Component({
  selector: 'app-pmo-addtask',
  templateUrl: './pmo-addtask.component.html',
  styleUrls: ['./pmo-addtask.component.scss']
})
export class PmoAddtaskComponent implements OnInit, OnDestroy {

  /** Subscription  of add task component */
  private subscription: Subscription;

  /** Task form of add task component */
  taskForm: FormGroup;

  /** Determines whether submitted is */
  isSubmitted = false;

  /** Select search of add task component */
  selectSearch: string;

  /** Project  of add task component */
  project: Project;

  /** Parent task of add task component */
  parentTask: ParentTask;

  /** User  of add task component */
  user: User;

  /** Task  of add task component */
  task: Task;

  /** Project list of add task component */
  projectList: Project[] = [];

  /** Parent task list of add task component */
  parentTaskList: ParentTask[];

  /** User list of add task component */
  userList: User[] = [];

  /** Submit button text of add task component */
  submitButtonText = 'Add';

  /** Determines whether parent is */
  isParent = false;

  /** Search type of add task component */
  searchType = 'parentTask' ;

  /** Search project type of add task component */
  searchProjectType = 'project' ;

  /** Search user type of add task component */
  searchUserType = 'User' ;

  /** Id  of add task component */
  id = '' ;
  userListFromService: any;


  /**
   * Creates an instance of add task component.
   * @param formBuilder FormBuilder
   * @param projectService ProjectService
   * @param userService UserService
   * @param taskService TaskService
   * @param route ActivatedRoute
   */
  constructor(private formBuilder: FormBuilder,
              private projectService: ProjectService,
              private userService: UserService,
              private taskService: TaskService,
              private route: ActivatedRoute) { }

  /**
   * on init
   */
  ngOnInit(): void {
    this.createTaskForm();
    this.getAllProjects();
    this.getAllParentTasks();
    this.getAllUsers();

    this.subscription = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.id = params['taskId'] || null;
      });

    if (this.id){
      this.getTaskById(this.id);
      this.submitButtonText = 'Update';
    }
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Gets form controls
   */
  get formControls(): any {
    return this.taskForm.controls;
   }

  /**
   * Creates task form
   */
  createTaskForm(): void {
    const today = new Date();
    const nextDay = new Date(new Date().setDate(today.getDate() + 1));
    this.taskForm = new FormGroup({
      id: new FormControl(),
      project: new FormControl({ value: '', disabled: true }),
      projectId: new FormControl('', [Validators.required]),
      task: new FormControl('', [Validators.required]),
      parent: new FormControl(),
      priority: new FormControl(0),
      parentTask: new FormControl({ value: '', disabled: true }),
      parentTaskId: new FormControl(''),
      startDate: new FormControl(new Date().toISOString().substr(0, 10)),
      endDate: new FormControl(nextDay.toISOString().substr(0, 10)),
      user: new FormControl({ value: '', disabled: true }),
      userId: new FormControl(''),
      status: new FormControl(0)
    });
  }

  /**
   * Determines whether parent task is
   * @param checked Checked
   */
  isParentTask(checked): void {
    this.isParent = checked;
    const today = new Date();
    const nextDay = new Date(new Date().setDate(today.getDate() + 1));
    if (checked) {
      this.taskForm.get('startDate').setValue('') ;
      this.taskForm.get('startDate').disable();
      this.taskForm.get('endDate').setValue('') ;
      this.taskForm.get('endDate').disable();
      this.taskForm.get('priority').disable();
      this.taskForm.get('parentTaskId').disable();
      this.taskForm.get('userId').disable();
      this.taskForm.get('parentTaskId').setValue('');
      this.taskForm.get('userId').setValue('');
      this.taskForm.controls.user.setValue('');
      this.user = null;
    } else {
      const minStartDay = new Date().toISOString().split('T')[0];
      const minEndDay = nextDay.toISOString().split('T')[0];

      this.taskForm.get('startDate').enable();
      this.taskForm.get('endDate').enable();
      this.taskForm.get('priority').enable();
      this.taskForm.get('projectId').enable();
      this.taskForm.get('parentTaskId').enable();
      this.taskForm.get('userId').enable();

      document.getElementsByName('startdate')[0].setAttribute('min', minStartDay);
      document.getElementsByName('enddate')[0].setAttribute('min', minEndDay);
      this.taskForm.get('startDate').setValue(new Date().toISOString().substr(0, 10));
      this.taskForm.get('endDate').setValue(nextDay.toISOString().substr(0, 10));
    }
  }

  /**
   * Determines whether task submit on
   */
  onTaskSubmit(): void {
    this.isSubmitted = true;
    if (this.taskForm.invalid) {
      return;
    }else {
      const taskFormValue = this.taskForm.value;
      if (taskFormValue.parent){
        // Add Parent Task
        const parentTask: ParentTask = {
          id: taskFormValue.id,
          parentTask : taskFormValue.task
        };
        this.addParentTask(parentTask);
      }else{
        delete this.project.user;
        const task: Task = {
          id: taskFormValue.id,
          task: taskFormValue.task,
          project: this.project,
          parent: taskFormValue.parent,
          parentTask: this.parentTask,
          priority: taskFormValue.priority,
          startDate: taskFormValue.startDate,
          endDate: taskFormValue.endDate,
          userId: this.user.id,
          status: taskFormValue.status
        };
        this.addTask(task);
      }

    }
  }

  /**
   * Adds parent task
   * @param parentTask ParentTask
   */
  addParentTask(parentTask: ParentTask): void {
    this.taskService.addParentTask(parentTask)
    .subscribe(res => {
      this.getAllParentTasks();
      this.resetForm();
    });
  }

  /**
   * Gets task by id
   * @param id Id
   */
  getTaskById(id: string): void{
      this.task = JSON.parse(sessionStorage.getItem('currentTask'));
      this.getAllUsers(parseInt(id, 10));
  }

  /**
   * Sets form values
   * @param task Task
   */
  setFormValues(task: Task): void{
    const formValues: any = {
      id: task.id,
      project: task.project.project,
      projectId: task.project.id,
      task: task.task,
      parent: false,
      priority: task.priority ? task.priority : 0 ,
      parentTask: task.parentTask.parentTask,
      parentTaskId: task.parentTask.id,
      startDate: new Date(task.startDate).toISOString().substr(0, 10),
      endDate: new Date(task.endDate).toISOString().substr(0, 10),
      user: task.user ? task.user.firstName + ' ' + task.user.lastName : '',
      userId: task.user ? task.user.id : '',
      status: task.status
    };
    this.taskForm.setValue(formValues);
    this.project = task.project;
    this.user = task.user;
    this.parentTask = task.parentTask;
  }

  /**
   * Adds task
   * @param task Task
   */
  addTask(task: Task): void {
    this.taskService.addOrUpdateTask(task)
    .subscribe(res => {
      // const user =  JSON.parse(JSON.stringify(task.user));
      // const projectInfo = JSON.parse(JSON.stringify(task.project));
      // const taskCopy = JSON.parse(JSON.stringify(task));
      // taskCopy.id = res;
      // delete taskCopy.project;
      // delete taskCopy.user;
      // user.projectData = projectInfo;
      // user.task = taskCopy;
      // this.userService.addOrEditUser(user) .subscribe(result => { });
      this.resetForm();
    });
  }

  /**
   * Resets form
   */
  resetForm(): void {
    this.taskForm.reset();
    this.submitButtonText = 'Add';
    this.isParent = false;
    this.isParentTask(false);
    this.isSubmitted = false;
  }

  /**
   * Clears search type
   */
  clearSearchType(): void{
    this.selectSearch = '';
  }

  /**
   * Selected row
   * @param selectedObj Object
   * @param type Type
   */
  selectedRow(selectedObj: any, type: string): void{
    switch (type) {
    case 'project':
      this.project = selectedObj;
      this.getAllUsers();
      this.taskForm.get('project').setValue(selectedObj.project);
      this.taskForm.get('projectId').setValue(selectedObj.id);
      this.selectSearch = selectedObj.project;
      break;
    case 'parentTask':
      this.selectSearch = selectedObj.parentTask;
      this.parentTask = selectedObj;
      this.taskForm.get('parentTask').setValue(selectedObj.parentTask);
      this.taskForm.get('parentTaskId').setValue(selectedObj.id);
      break;
    case 'user':
      this.user = selectedObj;
      this.taskForm.get('userId').setValue(selectedObj.id);
      this.taskForm.get('user').setValue(selectedObj.firstName + ' ' + selectedObj.lastName);
      this.selectSearch = selectedObj.firstName + ' ' + selectedObj.lastName;
      break;
    }
  }

  /**
   * Gets all projects
   */
  getAllProjects(): void{
    this.projectService.getAllProjects()
      .subscribe(data => {
        data.forEach(element => {
          element.id = element.project_id;
        });
        this.projectList = data;
      });
  }

  /**
   * Gets all parent tasks
   */
  getAllParentTasks(): void{
    this.taskService.getAllParentTasks()
      .subscribe(data => {
        this.parentTaskList = data;
      });
  }


  /**
   * Gets all users
   */
  getAllUsers(userid?: number): void {
    this.userService.getAllUsers()
      .subscribe(data => {
        data.forEach(element => {
          element.id = element.user_id;
        });
        this.userListFromService = data;
        this.userList = data.filter(dataElement =>  (dataElement.projectId === null || dataElement.isManager !== 1 ||
          (this.project && dataElement.isManager === 1 && dataElement.projectId === this.project.id)));
          if (this.submitButtonText === 'Update' && userid) {
            this.task.user = this.userListFromService.find(userElement => userElement.taskId === userid);
            this.setFormValues(this.task);
          }
    
      });
  }

}
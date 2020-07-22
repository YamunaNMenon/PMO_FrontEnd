/** User Service URLS */
export class UserServiceURLS {
   
    public static get SAVE_OR_UPDATE(): string { return '/pm-user/user/saveUpdateUser'; }
   
    public static get GET_ALL_USERS(): string { return '/pm-user/user/getAllUsers'; }
 
    public static get DELETE_USER(): string { return '/pm-user/user/delete'; }
}

/** Project Service URLS */
export class ProjectServiceURLS {

    public static get SAVE_OR_UPDATE(): string { return '/pm-project/project/saveUpdateProject'; }

    public static get GET_ALL_PROJECTS(): string { return '/pm-project/project/getAllProjects'; }
    
    public static get DELETE_PROJECT(): string { return '/pm-project/project/delete'; }
}

/** Task service urls */
export class TaskServiceURLS {
   
    public static get SAVE_OR_UPDATE(): string { return '/pm-project/task/saveUpdateTask'; }  
   
    public static get GET_ALL_TASKS(): string { return '/pm-project/task/getAllTasks'; }
   
    public static get DELETE_TASK(): string { return '/pm-project/task/delete'; }
  
    public static get SAVE_UPDATE_PARENT_TASK(): string { return '/pm-project/parentTask/saveUpdateParentTask'; }
  
    public static get GET_ALL_PARENT_TASKS(): string { return '/parentTask/getAllParentTasks'; }
}
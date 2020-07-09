/** User Service URLS */
export class UserServiceURLS {
   
    public static get SAVE_OR_UPDATE(): string { return '/user/saveUpdateUser'; }
   
    public static get GET_ALL_USERS(): string { return '/user/getAllUsers'; }
 
    public static get DELETE_USER(): string { return '/user/delete'; }
}

/** Project Service URLS */
export class ProjectServiceURLS {

    public static get SAVE_OR_UPDATE(): string { return '/project/saveUpdateProject'; }

    public static get GET_ALL_PROJECTS(): string { return '/project/getAllProjects'; }
    
    public static get DELETE_PROJECT(): string { return '/project/delete'; }
}

/** Task service urls */
export class TaskServiceURLS {
   
    public static get SAVE_OR_UPDATE(): string { return '/task/saveUpdateTask'; }  
   
    public static get GET_ALL_TASKS(): string { return '/task/getAllTasks'; }
   
    public static get DELETE_TASK(): string { return '/task/delete'; }
  
    public static get SAVE_UPDATE_PARENT_TASK(): string { return '/parentTask/saveUpdateParentTask'; }
  
    public static get GET_ALL_PARENT_TASKS(): string { return '/parentTask/getAllParentTasks'; }
}
/** User Service URLS */
export class UserServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/user/saveUpdateUser'; }

    /** Gets get all user */
    public static get GET_ALL_USERS(): string { return '/user/getAllUsers'; }

    /** Gets delete user */
    public static get DELETE_USER(): string { return '/user/delete'; }
}

/** Project Service URLS */
export class ProjectServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/project/saveUpdateProject'; }

    /** Gets get all projects */
    public static get GET_ALL_PROJECTS(): string { return '/project/getAllProjects'; }

    /** Gets delete project */
    public static get DELETE_PROJECT(): string { return '/project/delete'; }
}

/** Task service urls */
export class TaskServiceURLS {

    /** Gets save or update */
    public static get SAVE_OR_UPDATE(): string { return '/task/saveUpdateTask'; }
  
    /** Gets get all tasks */
    public static get GET_ALL_TASKS(): string { return '/task/getAllTasks'; }
  
    /** Gets delete task */
    public static get DELETE_TASK(): string { return '/task/delete'; }
  
    /** Gets save update parent task */
    public static get SAVE_UPDATE_PARENT_TASK(): string { return '/parentTask/saveUpdateParentTask'; }
  
    /** Gets get all parent tasks */
    public static get GET_ALL_PARENT_TASKS(): string { return '/parentTask/getAllParentTasks'; }
}
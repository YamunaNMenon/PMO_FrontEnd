
/**
 * Project
 */
export interface Project {
    project_id?: number;
    id: number;
    project: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    user: any;
    noOfTasks?: number;
    noOfCompletedTask?: number;
}
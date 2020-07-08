
/**
 * Project
 */
export interface Project {
    user_id?: number;
    id: number;
    project: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    user: any;
    noOfTasks?: number;
    noOfCompletedTask?: number;
}
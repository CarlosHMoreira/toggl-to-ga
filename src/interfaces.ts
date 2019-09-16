import { Category } from './enums';

export interface Config {
    env: string,
    gaUrl: string,
    username: string,
    password: string,
}

export interface FormRegister {
    project: number,
    system: number,
    category: number,
    activity: number,
    date: string,
    startTime:string, 
    endTime:string,
    description: string,
    controlType: string
}

export interface GetReportsAnswer {
    reportsPath: string,
    reports: string[],
}

export interface TogglRow {
    User?: string,
    Email?: string,
    Client?: string,
    Project?: string,
    Task?: string,
    Description?: string,
    Billable?: string,
    'Start date'?: string,
    'Start time'?: string,
    'End date'?: string,
    'End time'?: string,
    Duration?: string,
    Tags?: string,
    Amount?: string,
}

export interface Register {
    client?: string,
    project?: string,
    description?: string,
    date?: string,
    start?: string,
    ended?: string,
    activityCategory?: Category,
    activity?: number, // @todo Create enum of activity 
}

export interface workingOn {
    activityCategory: Category,
    activity: Category,
}

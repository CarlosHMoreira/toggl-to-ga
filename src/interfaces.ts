import { Category, FormElementType } from './enums';

export interface Config {
    env: string,
    gaUrl: string,
    username: string,
    password: string,
    debugInput: boolean
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

export interface ProjectAndSystem {
    projectId: number,
    systemId: number,
}

export interface Spaceship {
    toCheckStart: Date,
    toCheckEnd: Date,
    start: Date,
    end: Date,
}

export interface FormElement {
    name: string,
    type: FormElementType,
    shouldAwait?: boolean,
}

export interface Form {
    project: FormElement,
    system: FormElement,
    category: FormElement,
    activity: FormElement,
    date: FormElement,
    startTime: FormElement,
    endTime: FormElement,
    description: FormElement,
    controlType: FormElement,
    submitAction: FormElement,
    errorsCtn: FormElement,
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
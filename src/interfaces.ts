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
    
}

export interface GetReportsAnswer {
    reportsPath: string,
    reports: string[],
}





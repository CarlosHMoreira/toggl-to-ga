import fs from 'fs';
import  path  from 'path';
import prompts, { PromptObject, Choice } from 'prompts';
import csvParser from 'csv-parser'

import { GetReportsAnswer, TogglRow } from '../interfaces';
import l from '../utils/logger';


const tryGetReports = async (): Promise<GetReportsAnswer> => {
    const promptConfig = {
        type: 'text',
        name: 'reportsPath',
        message: `Type the path to reports directory, relative to ${__dirname} or absolute`,
        initial: '../../reports',
    } as PromptObject;    
    
    const { reportsPath } = await prompts(promptConfig);

    try {
        const content = fs.readdirSync(
            path.resolve(__dirname, reportsPath),
            {
                encoding: 'utf8',
            },
        );

        if (content) {
            const reports = content.filter(filename => filename.includes('.csv'));
            if (reports.length > 0) {
                return { reports, reportsPath } as GetReportsAnswer;
            }
        }
        
        throw new Error('No csv file found');
    } catch (error) {
        l.error('Reports not found, check if was informed the right path.');
        return await tryGetReports();        
    }
};

const showReportsList = async (reports: string[]): Promise<string> => {
    const choices =  reports.map(it => ({ title: it, value: it, disabled: false } as Choice));
    const promptConfig = {
        type: 'select',
        name: 'chosen',
        message: 'Choose a report',
        choices,
        initial: 0,
    } as PromptObject;

    const { chosen } = await prompts(promptConfig);
    return chosen;
}

const getReportData = async (fileName: string, reportsPath: string): Promise<TogglRow[]> => 
    new Promise((resolve, reject) => {
        const result:TogglRow[] = [];
        l.info(`Reading CSV ${fileName}`);
        try {
            fs.createReadStream(path.resolve(__dirname, reportsPath, fileName))
                .pipe(csvParser())
                .on('data', data => result.push(data))
                .on('end', () => {
                    l.info('Finished to read csv');
                    resolve(result);
                });
        } catch(error) {
            l.error('Check if the csv is a valid toggl report');
            reject(error);
        }
    });

export default async (): Promise<TogglRow[]> => {
    const { reports, reportsPath } = await tryGetReports();    
    
    const reportChosen = reports.length > 1 
        ? await showReportsList(reports)
        : reports[0];

    const reportData = await getReportData(reportChosen, reportsPath);
    
    if (!reportData.length) {
        l.error('No records found in csv');
        throw new Error('No records found in csv');
    }

    return reportData;
}

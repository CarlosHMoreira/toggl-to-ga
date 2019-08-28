import prompts = require('prompts');

import { TogglRow } from '../interfaces';
import { PromptObject } from 'prompts';
import l from '../utils/logger';

const askProjectId = async (projectName: string) => {
    const questions = {
            type: "number",
            name: "projectId",
            message: `What's the ${projectName} project Id ?`,
            initial: 1,
            validate: value =>  (Number.isNaN(+value)|| +value <=0) ? 'Should be a number greater tha 0 (zero)' : true
        } as PromptObject;

    return await prompts(questions);
}

export default async (reportData: TogglRow[]) => {
    const projects = new Map<string, number>();

    for (const { Project: projectName } of reportData) {
        if (!projectName || projects.has(projectName)) continue;

        const { projectId } = await askProjectId(projectName);
        projects.set(projectName, projectId)

        l.warn(`Project ${projectName} now has Id ${projectId}. `);
    }

    return projects;
};
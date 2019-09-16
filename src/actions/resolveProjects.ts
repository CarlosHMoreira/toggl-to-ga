import prompts = require('prompts');

import { TogglRow, ProjectAndSystem } from '../interfaces';
import { PromptObject } from 'prompts';
import l from '../utils/logger';

const askProjectId = async (projectName: string) => {
    const questions = [
        {
            type: "number",
            name: "projectId",
            message: `What's the ${projectName} project Id ?`,
            hint: "You can find it in G.A application",
            validate: value =>  (Number.isNaN(+value)|| +value <=0) ? 'Should be a number greater tha 0 (zero)' : true
        },
        {
            type: "number",
            name: "systemId",
            message: `What's the ${projectName} system Id ?`,
            hint: "You can find it in G.A application",
            validate: value =>  (Number.isNaN(+value)|| +value <=0) ? 'Should be a number greater tha 0 (zero)' : true
        }
    ] as PromptObject[];

    return await prompts(questions);
}

export default async (reportData: TogglRow[]) => {
    const projects = new Map<string, ProjectAndSystem>();

    for (const { Project: projectName } of reportData) {
        if (!projectName || projects.has(projectName)) continue;

        const { projectId, systemId } = await askProjectId(projectName);
        projects.set(projectName, {projectId, systemId})

        l.warn(`Project ${projectName} now has projectId ${projectId} and systemId ${systemId}.`);
    }

    return projects;
};
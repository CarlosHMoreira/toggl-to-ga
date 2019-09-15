import prompts = require('prompts');

import { TogglRow, workingOn } from '../interfaces';
import { Category } from '../enums';
import { Choice, PromptObject } from 'prompts';
import l from '../utils/logger';
import categoryActivityMap from '../config/categoryActivityMap';

const getTags = (reportsTag: string) => reportsTag.split(',');

const getCategoriesOptions = () => {
    const categories = Object.entries(Category);
    return categories
        .splice(0, (categories.length / 2))
        .map( ([value, title]: any) => ({ title, value, disable: true } as Choice));
};

const getActivity = (categoryId: number) => {
    const [ activities ] = Object.entries(categoryActivityMap)
        .filter(([_, obj]) => (categoryId === obj.id))
        .map(([_, obj]) => obj.activities );
    
    const activitiesList =  Object.entries(activities);
    
    return activitiesList
        .splice(0, (activitiesList.length / 2))
        .map( ([value, title]: any) => ({ title, value, disable: true } as Choice));
};


const askCategory = async (
    tagName: string, 
    categoryChoices: Choice[], 
    ) => {
    const questions = [
        {
            type: "select",
            name: "activityCategory",
            message: `Which category does the ${tagName} tag belong to ?`,
            choices: categoryChoices,
        },
    ] as PromptObject[];

    return await prompts(questions);
}

const askActivity = async (
    tagName: string, 
    activitiesChoices: Choice[],
    ) => {
    const questions = [
        {
            type: "select",
            name: "activity",
            message: `Now which subCategory does the ${tagName} tag belong to ?`,
            choices: activitiesChoices,
        }, 
    ] as PromptObject[];

    return await prompts(questions);
}

export default async (reportData: TogglRow[]) => {

    const tagMeaning = new Map<string, workingOn>();
    const categoriesOptions = getCategoriesOptions();

    for (const { Tags } of reportData) {
        const tags = getTags((Tags || ''));

        for (const tag of tags) {
            if (tagMeaning.has(tag) || !tag) continue;
            
            const { activityCategory } = await askCategory(tag, categoriesOptions);
            const { activity } = await askActivity(tag, getActivity(parseInt(activityCategory)));
            
            tagMeaning.set(tag, { activityCategory, activity });

            l.warn('Understood!');
        }
    }
    return tagMeaning;
};
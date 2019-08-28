import prompts = require('prompts');

import { TogglRow, workingOn } from '../interfaces';
import { Category } from '../enums';
import { Choice, PromptObject } from 'prompts';
import l from '../utils/logger';

const getTags = (reportsTag: string) => reportsTag.split(',');

const getCategoriesOptions = () => {
    const categories = Object.entries(Category);
    return categories
        .splice(0, (categories.length / 2))
        .map( ([value, title]: any) => ({ title, value, disable: true } as Choice));
};

const getSubCategoriesOptions = () => {
    const categories = Object.entries(Category);
    return categories
        .splice(0, (categories.length / 2))
        .map( ([value, title]: any) => ({ title, value, disable: true } as Choice));
};

const askTagMeaning = async (
    tagName: string, 
    categoryChoices: Choice[], 
    subCategoryChoices: Choice[],
    ) => {
    const questions = [
        {
            type: "select",
            name: "activityCategory",
            message: `Which category does the ${tagName} tag belong to ?`,
            choices: categoryChoices,
        },
        {
            type: "select",
            name: "activity",
            message: `Now which subCategory does the ${tagName} tag belong to ?`,
            choices: subCategoryChoices,
        }, 
    ] as PromptObject[];

    return await prompts(questions);
}

export default async (reportData: TogglRow[]) => {

    const tagMeaning = new Map<string, workingOn>();
    const categoriesOptions = getCategoriesOptions();
    const subCategoriesOptions = getSubCategoriesOptions();

    for (const { Tags } of reportData) {
        const tags = getTags((Tags || ''));

        for (const tag of tags) {
            if (tagMeaning.has(tag) || !tag) continue;
            
            const response = await askTagMeaning(tag, categoriesOptions, subCategoriesOptions) as workingOn;
            tagMeaning.set(tag, response);
            l.warn('Understood!');
        }
    }
    return tagMeaning;
};
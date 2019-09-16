import { TogglRow, workingOn, FormRegister } from '../interfaces';
import { toRegisterDateStringFormat, toRegisterFormatTime } from '../utils/dateHelper';
import l from '../utils/logger';


export default (reports: TogglRow[], projectMap: Map<string, number>, tagMap: Map<string, workingOn>) => {
    l.info('Parsing rows to register format');
    return reports.map((row) => {
        const { activityCategory: category, activity } = tagMap.get(row.Tags || '') as workingOn;

        return {
            project: projectMap.get(row.Project || ''),
            category,
            activity,
            date: toRegisterDateStringFormat(row['Start date']),
            startTime: toRegisterFormatTime(row['Start time']),
            endTime: toRegisterFormatTime(row['End time']),
            description: row.Description,
            controlType: 'Sem Controle',
        } as FormRegister;
    });
};
import { TogglRow, workingOn, FormRegister, ProjectAndSystem } from '../interfaces';
import { toRegisterDateStringFormat, toRegisterFormatTime } from '../utils/dateHelper';
import l from '../utils/logger';


export default (reports: TogglRow[], projectMap: Map<string, ProjectAndSystem>, tagMap: Map<string, workingOn>) => {
    l.info('Parsing rows to register format');
    return reports.map((row) => {
        const { activityCategory: category, activity } = tagMap.get(row.Tags || '') as workingOn;
        const { projectId: project, systemId: system } = projectMap.get(row.Project || '') as ProjectAndSystem;

        return {
            project,
            system,
            category,
            activity,
            date: toRegisterDateStringFormat(row['Start date']),
            startTime: toRegisterFormatTime(row['Start time']),
            endTime: toRegisterFormatTime(row['End time']),
            description: row.Description,
            controlType: 'Sem definição',
        } as FormRegister;
    });
};
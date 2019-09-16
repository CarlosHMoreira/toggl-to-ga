import { TogglRow, workingOn, FormRegister } from '../interfaces';
import l from '../utils/logger';
import formatTime from '../utils/formatTime';
import formatDate from '../utils/formatDate';


export default (reports: TogglRow[], projectMap: Map<string, number>, tagMap: Map<string, workingOn>) => {
    const registers = reports.map((row) => {
        const { activityCategory: category, activity } = tagMap.get(row.Tags || '') as workingOn;

        return {
            project: projectMap.get(row.Project || ''),
            category,
            activity,
            date: formatDate(row['Start date']),
            startTime: formatTime(row['Start time']),
            endTime: formatTime(row['End time']),
            description: row.Description,
            controlType: 'Sem Controle',
        } as FormRegister;
    });
};
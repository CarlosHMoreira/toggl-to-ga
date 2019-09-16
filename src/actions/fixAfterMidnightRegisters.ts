import { TogglRow } from '../interfaces';
import { getStartDate, getEndDate } from '../utils/dateHelper';
import l from '../utils/logger';

const limitTime = '23:59:59';

const separateRegister = (row: TogglRow): TogglRow[] => {
    const newRow: TogglRow = {...row};
    newRow['Start date'] = row['End date'];
    newRow['Start time'] = '00:00:00';

    row['End date'] = row['Start date'];
    row['End time'] = limitTime;

    return [row, newRow];
};

export default (reports: TogglRow[]) => {
    const newReport: TogglRow[] = [];
  
    for (const row of reports) {
        const dateLimit = getStartDate(row, limitTime);
        const endDate = getEndDate(row);

        if (dateLimit < endDate) {
            l.warn(`Record  ${row.Description} of ${row['Start date']} goes until the following day. This will generate another record.`);
            newReport.push(...separateRegister(row));
            continue;
        }
        newReport.push(row);
    }
    return newReport;
};
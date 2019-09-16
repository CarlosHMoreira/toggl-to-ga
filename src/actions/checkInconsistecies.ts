import { TogglRow } from '../interfaces';
import { getStartDate, getEndDate } from '../utils/dateHelper';
import isValidSpaceship from '../utils/spaceship';

export default (report: TogglRow[]) => {
    const errors: any[] = [];

    const verify = (row: TogglRow, toCompare: TogglRow) => {
        const toCheckStart = getStartDate(row);
        const toCheckEnd = getEndDate(row);
        const start = getStartDate(toCompare);
        const end = getEndDate(toCompare);
        
        if (!isValidSpaceship({ toCheckStart, toCheckEnd, start, end })) {
            errors.push({error: 'Time conflict', rowDesc: row.Description, toCheckStart, toCheckEnd, with: 'with', start, end, comparedDesc: toCompare.Description });
            return false;
        }
        return true;
    };

    const checkIconsistency = (row: TogglRow) => report.some(toCompare => verify(row, toCompare));

    report.forEach(checkIconsistency);
    return errors;
}
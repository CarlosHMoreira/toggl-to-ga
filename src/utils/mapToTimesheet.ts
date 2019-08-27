import { TogglRow, Register } from '../interfaces';

import formatDate from './formatDate';
import formatTime from './formatTime';

export default (togglRows: TogglRow[]): Register[] => {
    return togglRows.map(it => ({
        project: it.Project,
        client: it.Client,
        date: formatDate((it['Start date'])),
        description: it.Description,
        start: formatTime(it['Start time']),
        ended: formatTime(it['End time']),
    }) as Register);
};
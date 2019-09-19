import { TogglRow } from '../interfaces';

const isValidDateString = (dateString: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error('Method isValidDateString expects a string in the format yyyy-mm-dd');
    }
};

const isValidTimeString = (timeString: string) => {
    if (!/^([0-1][0-9]|2[0-3]):([0-5]\d):[0-5]\d$/.test(timeString)) {
        throw new Error('Method isValidTimeString expects a string in the format hh-mm-ss');
    }
}

const setTimestring = (timeString: string | undefined) => timeString ? timeString.replace(/\d{2}$/,"00"): '00:00:00';
export const getStartDate = (row: TogglRow, timeString: string|null = null) => new Date(`${row['Start date']}T${timeString ? timeString : setTimestring(row['Start time'])}`);
export const getEndDate = (row: TogglRow, timeString: string|null = null) => new Date(`${row['End date']}T${timeString ? timeString : setTimestring(row['End time'])}`);

export const toRegisterDateStringFormat = (dateString = ''): string => {
    isValidDateString(dateString);

    return dateString
        .split('-')
        .reverse()
        .join('/');
};

export const toRegisterFormatTime = (timeString = ''): string => {
    isValidTimeString(timeString);

    return timeString.substring(5, -1);
}
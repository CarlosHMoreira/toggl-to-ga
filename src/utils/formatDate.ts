const isValidDateString = (dateString: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error('Method isValidDateString expects a string in the format yyyy-mm-dd');
    }
};

export default (dateString = ''): string => {
    isValidDateString(dateString);

    return dateString
        .split('-')
        .reverse()
        .join('/');
};
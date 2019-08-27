const isValidTimeString = (timeString: string) => {
    if (!/^([0-1][0-9]|2[0-3]):([0-5]\d):[0-5]\d$/.test(timeString)) {
        throw new Error('Method isValidTimeString expects a string in the format hh-mm-ss');
    }
}

export default (timeString = ''): string => {
    isValidTimeString(timeString);

    return timeString.substring(5, -1);
}
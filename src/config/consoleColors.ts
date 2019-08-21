const reset = "\x1b[0m"
const red = "\x1b[31m"
const green = "\x1b[32m"
const yellow = "\x1b[33m"
const blue = "\x1b[34m"

const setColor = (color: string) => `${color}%s${reset}`;

export default {
    error: setColor(red),
    success: setColor(green),
    warn: setColor(yellow),
    info: setColor(blue),
}
import cc from '../config/consoleColors';

const withColor = (color: string) => (...content: any) => console.log(color, content);

export default {
    d: (content: any) => console.log(content),
    error: withColor(cc.error),
    warn: withColor(cc.warn),
    info: withColor(cc.info),
}
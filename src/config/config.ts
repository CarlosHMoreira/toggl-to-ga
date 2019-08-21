import { Config } from '../interfaces';

export default {
    env: process.env.NODE_ENV as string ,
    gaUrl: process.env.GA_URL as string,
    username: process.env.LOGIN as string,
    password: process.env.PASSWD as string,
} as Config;


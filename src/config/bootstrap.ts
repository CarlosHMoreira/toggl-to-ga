require('dotenv').config({ debug: process.env.DEBUG });

import l from '../utils/logger';

export default ():void => {
    l.info(`Inializing. Env is ${process.env.NODE_ENV}`);
    // Here goes any other
}
require('dotenv').config({ debug: process.env.DEBUG });

export default ():void => {
    console.log(`Inializing. Env is ${process.env.NODE_ENV}`);
    // Here goes any other
}
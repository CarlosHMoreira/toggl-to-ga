require('dotenv').config();

export default ():void => {
    console.log(`Inializing. Env is ${process.env.NODE_ENV}`);
    // Here goes any other
}
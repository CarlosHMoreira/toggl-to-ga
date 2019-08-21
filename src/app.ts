import { bootstrap } from './config';
import start from './actions/start'

export default () => {
    bootstrap();
    start();
}

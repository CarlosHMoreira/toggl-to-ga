import fs from 'fs';
import  path  from 'path';

import l from '../utils/logger';
export default () => {
    
    const content = fs.readdirSync(
        path.resolve(__dirname, '../../togglReport'),
        {
            encoding: 'utf8',
        },
    );
    
    if (!content) {
        l.error('No reports found');
        throw new Error('No reports found');
    }

    l.warn('Report(s) found:');
    l.d(content);
}
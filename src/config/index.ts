import dbConfig from './db.config';
import momentConfig from './moment.config';
import passportConfig from './passport.config';

function config() {
    dbConfig();
    momentConfig();
}

export { config, passportConfig };

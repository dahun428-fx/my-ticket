import configDev from './config.development';
import configLocal from './config.local';
import configPrd from './config.product';

export default () => {
    switch (process.env.NEXT_PUBLIC_RUN_MODE) {
        case 'local': return configLocal;
        case 'dev': return configDev;
        case 'prd': return configPrd;
        default: return configLocal;
    }
}

import moment from 'moment-timezone';

export default () => {
    moment.tz.setDefault('Europe/Dublin'); // GMT
};

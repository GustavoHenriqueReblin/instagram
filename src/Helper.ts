import moment from 'moment';

export const formatLongData = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
};

export const FormatNumberToString = (
    value: number | undefined, 
    singularText: string, 
    pluralText: string, 
    noDataMessage: string, 
    formatValue: Boolean = true
) => {
    if (value) {
        const newValue = formatValue ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : '';
        if (value > 1) {
            return newValue + ' ' + pluralText;
        } else {
            return newValue + ' ' + singularText;
        }
    } else {
        return noDataMessage;
    }
};

export const getTimeAgo = (dateTime: Date | undefined) => {
    if (!dateTime) return '';

    const formatDate = moment(dateTime);
    const now = moment().utcOffset(-180);

    const secsAgo = now.diff(formatDate, 'seconds');
    const minsAgo = now.diff(formatDate, 'minutes');
    const hoursAgo = now.diff(formatDate, 'hours');
    const daysAgo = now.diff(formatDate, 'days');

    if (secsAgo < 60) {
        return secsAgo + 's';
    } 
    else if (minsAgo < 60) {
        return minsAgo + 'm';
    } 
    else if (hoursAgo < 24) {
        return hoursAgo + 'h';
    } 
    else {
        return daysAgo + 'd';
    }
}
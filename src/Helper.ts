export const formatLongData = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
};

export const FormatNumberToString = 
    (value: number | undefined, singularText: string, pluralText: string, noRegisterMessage: string) =>
{
    if (value) {
        const newValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        if (value > 1) {
            return newValue + ' ' + pluralText;
        } else {
            return newValue + ' ' + singularText;
        }
    } else {
        return noRegisterMessage;
    }
};
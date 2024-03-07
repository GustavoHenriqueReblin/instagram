export const formatLongData = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
}
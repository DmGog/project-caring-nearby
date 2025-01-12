export const formatNumber = (number: number) => {
    const numberStr = number.toString();
    const formattedNumber = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return formattedNumber;
}
export function priceSplitter(num: number | null | undefined): string {
    if (num === null || num === undefined) {
        return '';
    }

    const [integerPart, decimalPart] = num.toString().split('.');

    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
}

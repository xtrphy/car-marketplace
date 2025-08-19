import numeral from "numeral";

numeral.register('locale', 'ru', {
    delimiters: {
        thousands: '.',
        decimal: ","
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function () {
        return ".";
    },
    currency: {
        symbol: "₸",
    },
});

numeral.locale("ru");

export default numeral;
const validator = () => {

    const required = (value) => value.length > 0;

    const isNumber = (n) => !isNaN(parseFloat(n)) && !isNaN(n - 0);

    const isChecked = (value) => required(value);

    const isValueNumber = (value) => isNumber(value);

    return {isChecked, isValueNumber}
};

export default validator;
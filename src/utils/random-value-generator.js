export default class RandomValueGenerator {

    letters = 'aeioubcdfghjklmnpqrstvwxyz';
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    symbols = '!#()*+-_';


    _getRandomElement = (arr) => {
        const pos = ~~(Math.random() * arr.length);
        return arr[pos];
    };

    getRandomSymbol = () => this._getRandomElement(this.symbols);

    getRandomNumber = () => this._getRandomElement(this.numbers);

    getRandomUpper = () => this._getRandomElement(this.letters).toUpperCase();

    getRandomLower = () => this._getRandomElement(this.letters);

    funcRand = {
        upper: this.getRandomUpper,
        lower: this.getRandomLower,
        number: this.getRandomNumber,
        symbol: this.getRandomSymbol
    };

    getRandomPassword = (length, actions) => {
        let password = '';
        const len = length - 1;
        while (password.length <= len) {
            password += this.funcRand[this._getRandomElement(actions)]();
        }
        return password;
    };

}
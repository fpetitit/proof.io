const basket = require('../src/basket');

exports.sum = function (args) {
    const res = basket.sum(args.map(arg => {
        return Number(arg);
    }));
    return res;
};

exports.sub = function (args) {
    return basket.sub(...(args.map(arg => {
        return Number(arg);
    })));
};

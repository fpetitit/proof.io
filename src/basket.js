exports.sum = values => {
    let sum = 0;
    values.forEach(element =>
        sum += element
    );
    return sum;
};

exports.sub = (a, b) => {
    return a - b;
};

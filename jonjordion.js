let fs = require('fs');
let cheerio = require('cheerio');

function run() {
    var contents = fs.readFileSync('./test/basket_jonjordion.html').toString();
    let $ = cheerio.load(contents);

    let rows = $('tr');
    rows.map(function (i, el) {
        let firstValue = $(this).find('td').eq(0).html();
        let secondValue = $(this).find('td').eq(1).html();
        let expected = $(this).find('td').eq(2).html();
        if (Number(expected) === (Number(firstValue) + Number(secondValue))) {
            $(this).find('td').eq(2).css('background-color', "green");
        } else {
            $(this).find('td').eq(2).css('background-color', "red");
        }
    });

    fs.writeFileSync('./test/basket_jonjordion_result.html', $.html());
}

run();
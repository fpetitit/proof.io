const fs = require('fs');
const cheerio = require('cheerio');
const glob = require("glob");
const appDir = process.cwd();

generateTestsResults = function() {
    glob(`${appDir}/*/*_proof.js`, function (er, files) {
        files.forEach(file => {
            const fixtures = require(`${file}`);

            var contents = fs.readFileSync(`${file.substr(0, file.lastIndexOf("."))}.html`).toString();
            let $ = cheerio.load(contents);

            let rows = $('tr');
            rows.map(function () {
                let functionToExecute = $(this).parent().data('execute');
                let args = [];
                const columns = $(this).find('td');
                for (let i = 0; i < columns.length - 1; i++) {
                    args.push($(this).find('td').eq(i).text());
                }
                const expected = $(this).find('td').eq(columns.length - 1).text();
                const result = fixtures[functionToExecute](args);
                if (expected == result) {
                    $(this).find('td').eq(columns.length - 1).css('background-color', "green");
                } else {
                    $(this).find('td').eq(columns.length - 1).css('background-color', "red");
                    $(this).find('td').eq(columns.length - 1).text(`expected ${expected } but was ${result}`);
                }
            });

            fs.writeFileSync(`${file.substr(0, file.lastIndexOf("."))}_result.html`, $.html());
        })
    });
};

generateTestsResults();

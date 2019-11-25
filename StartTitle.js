const figlet = require('figlet');

generateTitle = (title) => {
    figlet.text(title, {
        font: 'bulbhead',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
    });
}

module.exports = generateTitle;
const hb = require('express-handlebars').create();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (function() {
        // this promise contains a callback function 
    function sendContactFormEmail(data) {
        return new Promise(function(resolve, reject) { 
            hb.render('views/welcome.hbs', {data} ).then(data => {
                sgMail.send({
                    to: 'info@chicagocanineclub.com',
                    from: data.email,
                    subject: 'Website Contact Inquiry ',
                    html: html
                });
            });
        });
    }
    return {
        sendContactFormEmail: sendContactFormEmail,
    }
})();
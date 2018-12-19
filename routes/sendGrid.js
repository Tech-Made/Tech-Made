const hb = require('express-handlebars').create();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (function() {

    function sendWelcomeEmail(user) {
        hb.render('views/emails/welcome.hbs', {user} ).then(html => {
            sgMail.send({
                to: user.email,
                from: 'team@techmade.co',
                subject: 'Welcome to Tech Made!',
                html: html
            });
        });
    }

    return {
        sendWelcomeEmail: (user) => sendWelcomeEmail(user)
    }

})();
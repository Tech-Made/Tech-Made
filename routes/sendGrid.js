const hb = require('express-handlebars').create();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (function() {
        // this promise contains a callback function 
    function sendWelcomeEmail(user) {
        return new Promise(function(resolve,reject) { 
            hb.render('views/emails/welcome.hbs', {user} ).then(html => {
                sgMail.send({
                    to: user.email,
                    from: 'team@techmade.co',
                    subject: 'Welcome to Tech Made!',
                    html: html
                });
            });
        });
    }
    function sendWebsiteAcceptanceEmail(user) {
        return new Promise(function(resolve,reject) { 
            hb.render('views/emails/acceptance.hbs', {user} ).then(html => {
                sgMail.send({
                    to: user.email,
                    from: 'team@techmade.co',
                    subject: 'Welcome to Tech Made!',
                    html: html
                });
            });
        });
    }
        //     if (emailSent) {
        //         resolve('Sent') //means we're fulfilling this promise
        //     } else {
        //         reject();
        //     }
        // });
    return {
        sendWelcomeEmail: sendWelcomeEmail,
        sendWebsiteAcceptanceEmail : sendWebsiteAcceptanceEmail
    }

})();
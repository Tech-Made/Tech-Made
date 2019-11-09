const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const User = require('../models/user');
const Project = require('../models/project');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/projects', async (req, res) => {
    const project = await new Project(req.body);
    project.save();
    return res.status(200).json(project);
});

router.post('/contact', async (req,res) => {
    // console.log('req.body:', req.body);
    const user = await new User(req.body);
    user.save();
    const fullName = req.body.fullName;
    const email = req.body.email;
    console.log('here');
        await sgMail.send({
            to: email,
            from: `"Techmade" <team@techmade.co>`,
            subject: 'Thanks for reaching out',
            html: `<p>Thanks for reaching out to Techmade. Someone from our team is going to contact you soon.</p>`
        });
    // });
    return res.status(200).send('Email Sent');
});


module.exports = router;
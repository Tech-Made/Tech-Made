const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const User = require('../models/User')
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/contact', async (req, res) => {
    // req.body looks like:
    // name
    // phone
    // number
    // subject
    // message
    // SendGrid.sendContactFormEmail(req.body);
    const data = req.body;
    console.log('data:', data);
    const user = new User(data);
    user.save();
    try {
        await sgMail.send({
            to: 'info@canineclubchicago.com',
            from: data.email,
            subject: 'Website Contact Inquiry ',
            html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
            <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
                <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
    
                <style type="text/css">
                body, p, div {
                    font-family: verdana,geneva,sans-serif;
                    font-size: 14px;
                }
                body {
                    color: #000000;
                }
                body a {
                    color: #1188E6;
                    text-decoration: none;
                }
                p { margin: 0; padding: 0; }
                table.wrapper {
                    width:100% !important;
                    table-layout: fixed;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-size-adjust: 100%;
                    -moz-text-size-adjust: 100%;
                    -ms-text-size-adjust: 100%;
                }
                img.max-width {
                    max-width: 100% !important;
                }
                .column.of-2 {
                    width: 50%;
                }
                .column.of-3 {
                    width: 33.333%;
                }
                .column.of-4 {
                    width: 25%;
                }
                @media screen and (max-width:480px) {
                    .preheader .rightColumnContent,
                    .footer .rightColumnContent {
                        text-align: left !important;
                    }
                    .preheader .rightColumnContent div,
                    .preheader .rightColumnContent span,
                    .footer .rightColumnContent div,
                    .footer .rightColumnContent span {
                    text-align: left !important;
                    }
                    .preheader .rightColumnContent,
                    .preheader .leftColumnContent {
                    font-size: 80% !important;
                    padding: 5px 0;
                    }
                    table.wrapper-mobile {
                    width: 100% !important;
                    table-layout: fixed;
                    }
                    img.max-width {
                    height: auto !important;
                    max-width: 480px !important;
                    }
                    a.bulletproof-button {
                    display: block !important;
                    width: auto !important;
                    font-size: 80%;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    }
                    .columns {
                    width: 100% !important;
                    }
                    .column {
                    display: block !important;
                    width: 100% !important;
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                    }
                }
                </style>
                <!--user entered Head Start-->
                
                <!--End Head user entered-->
            </head>
            <body>
                <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: verdana,geneva,sans-serif; color: #000000; background-color: #ffffff;">
                <div class="webkit">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
                    <tr>
                        <td valign="top" bgcolor="#ffffff" width="100%">
                        <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                            <td width="100%">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td>
                                    <!--[if mso]>
                                    <center>
                                    <table><tr><td width="600">
                                    <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                        <tr>
                                        <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                            
                <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                <tr>
                    <td role="module-content">
                    <p>${data.name} has contacted Canine Chicago.</p>
                    </td>
                </tr>
                </table>
            
                <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                <tr>
                    <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
                    <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/aa5393d036abb6141235a7a9f421aa459454d32935cb45620bd09cb5c7dbcfa9b258dd7b5e84b39ca8460010e49d7ef2f2bab871b623f4b2f8f9125188e87c78.jpg" alt="Tech Made" width="600">
                    </td>
                </tr>
                </table>
            
                <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                <tr>
                    <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                        height="100%"
                        valign="top"
                        bgcolor="">
                        <div><strong>Name: </strong><br>${data.name}</div>
                        <div><strong>Subject: </strong><br>${data.subject}</div>
                        <div><strong>Message: </strong><br>${data.message}</div>
                        <div><strong>Phone: </strong><br>${data.phone}</div>
                        <div><strong>Email: </strong><br>${data.email}</div>
                        
    
                    </td>
                </tr>
                </table>
            <table border="0" cellPadding="0" cellSpacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed" width="100%"><tbody><tr><td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px"><table border="0" cellPadding="0" cellSpacing="0" class="button-css__deep-table___2OZyb wrapper-mobile" style="text-align:center"><tbody><tr><td align="center" bgcolor="#793ea5" class="inner-td" style="border-radius:6px;font-size:16px;text-align:center;background-color:inherit"><a href="www.canine.com" style="background-color:#793ea5;border:1px solid #793ea5;border-color:#793ea5;border-radius:6px;border-width:1px;color:#ffffff;display:inline-block;font-family:arial,helvetica,sans-serif;font-size:16px;font-weight:normal;letter-spacing:0px;line-height:16px;padding:12px 18px 12px 18px;text-align:center;text-decoration:none" target="_blank">View Dashboard</a></td></tr></tbody></table></td></tr></tbody></table><div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="color:#444444;font-size:12px;line-height:20px;padding:16px 16px 16px 16px;text-align:center"><div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-family:Arial, Helvetica, sans-serif;font-size:12px;line-height:20px">[Sender_Name]</p><p style="font-family:Arial, Helvetica, sans-serif;font-size:12px;line-height:20px"><span class="Unsubscribe--senderAddress">[Sender_Address]</span>, <span class="Unsubscribe--senderCity">[Sender_City]</span>, <span class="Unsubscribe--senderState">[Sender_State]</span> <span class="Unsubscribe--senderZip">[Sender_Zip]</span> </p></div><p style="font-family:Arial, Helvetica, sans-serif;font-size:12px;line-height:20px"><a class="Unsubscribe--unsubscribeLink" href="<%asm_group_unsubscribe_raw_url%>">Unsubscribe</a> - <a class="Unsubscribe--unsubscribePreferences" href="<%asm_preferences_raw_url%>">Unsubscribe Preferences</a></p></div>
                                        </td>
                                        </tr>
                                    </table>
                                    <!--[if mso]>
                                    </td></tr></table>
                                    </center>
                                    <![endif]-->
                                    </td>
                                </tr>
                                </table>
                            </td>
                            </tr>
                        </table>
                        </td>
                    </tr>
                    </table>
                </div>
                </center>
            </body>
            </html>
            `
        });
        res.status(200);
        res.end();
    } catch (e) {
        res.status(500);
        res.end();
    } 
    // res.redirect("/");
})

router.post('/join'), async (req,  res) => {
    const user = new User(req.body);
    await user.save();
    res.status(200);
    res.end();
}

// router.post('/contact_us', async (req,res) => {
//     console.log('req.body:', req.body);
//     const user = await new User(req.body);
//     user.save();
//     const name = req.body.name;
//     const email = req.body.email;
//     const message = req.body.message;
//     console.log('here');
//     await sgMail.send({
//         to: email,
//         from: `"Canine Club Chicago" <team@canineclubchicago.com>`,
//         subject: 'Thanks for contacting Canine Club Chicago',
//         html:
//         `
//         <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
//         <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
//           <head>
//             <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
//             <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
//             <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
//             <!--[if (gte mso 9)|(IE)]>
//             <xml>
//             <o:OfficeDocumentSettings>
//             <o:AllowPNG/>
//             <o:PixelsPerInch>96</o:PixelsPerInch>
//             </o:OfficeDocumentSettings>
//             </xml>
//             <![endif]-->
//             <!--[if (gte mso 9)|(IE)]>
//             <style type="text/css">
//               body {width: 600px;margin: 0 auto;}
//               table {border-collapse: collapse;}
//               table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
//               img {-ms-interpolation-mode: bicubic;}
//             </style>
//             <![endif]-->
        
//             <style type="text/css">
//               body, p, div {
//                 font-family: lucida sans unicode,lucida grande,sans-serif;
//                 font-size: 14px;
//               }
//               body {
//                 color: #000000;
//               }
//               body a {
//                 color: #E737EA;
//                 text-decoration: none;
//               }
//               p { margin: 0; padding: 0; }
//               table.wrapper {
//                 width:100% !important;
//                 table-layout: fixed;
//                 -webkit-font-smoothing: antialiased;
//                 -webkit-text-size-adjust: 100%;
//                 -moz-text-size-adjust: 100%;
//                 -ms-text-size-adjust: 100%;
//               }
//               img.max-width {
//                 max-width: 100% !important;
//               }
//               .column.of-2 {
//                 width: 50%;
//               }
//               .column.of-3 {
//                 width: 33.333%;
//               }
//               .column.of-4 {
//                 width: 25%;
//               }
//               @media screen and (max-width:480px) {
//                 .preheader .rightColumnContent,
//                 .footer .rightColumnContent {
//                     text-align: left !important;
//                 }
//                 .preheader .rightColumnContent div,
//                 .preheader .rightColumnContent span,
//                 .footer .rightColumnContent div,
//                 .footer .rightColumnContent span {
//                   text-align: left !important;
//                 }
//                 .preheader .rightColumnContent,
//                 .preheader .leftColumnContent {
//                   font-size: 80% !important;
//                   padding: 5px 0;
//                 }
//                 table.wrapper-mobile {
//                   width: 100% !important;
//                   table-layout: fixed;
//                 }
//                 img.max-width {
//                   height: auto !important;
//                   max-width: 480px !important;
//                 }
//                 a.bulletproof-button {
//                   display: block !important;
//                   width: auto !important;
//                   font-size: 80%;
//                   padding-left: 0 !important;
//                   padding-right: 0 !important;
//                 }
//                 .columns {
//                   width: 100% !important;
//                 }
//                 .column {
//                   display: block !important;
//                   width: 100% !important;
//                   padding-left: 0 !important;
//                   padding-right: 0 !important;
//                   margin-left: 0 !important;
//                   margin-right: 0 !important;
//                 }
//               }
//             </style>
//             <!--user entered Head Start-->
            
//               <!--End Head user entered-->
//           </head>
//           <body>
//             <center class="wrapper" data-link-color="#E737EA" data-body-style="font-size: 14px; font-family: lucida sans unicode,lucida grande,sans-serif; color: #000000; background-color: #E1E3E4;">
//               <div class="webkit">
//                 <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#E1E3E4">
//                   <tr>
//                     <td valign="top" bgcolor="#E1E3E4" width="100%">
//                       <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
//                         <tr>
//                           <td width="100%">
//                             <table width="100%" cellpadding="0" cellspacing="0" border="0">
//                               <tr>
//                                 <td>
//                                   <!--[if mso]>
//                                   <center>
//                                   <table><tr><td width="600">
//                                   <![endif]-->
//                                   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
//                                     <tr>
//                                       <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#E1E3E4" width="100%" align="left">
                                        
//             <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
//                     style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
//               <tr>
//                 <td role="module-content">
//                   <p>${name}, Welcome to Credit Swag! Details below...</p>
//                 </td>
//               </tr>
//             </table>
          
//             <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
//               <tr>
//                 <td style="padding:24px 0px 0px 0px;line-height:22px;text-align:inherit;"
//                     height="100%"
//                     valign="top"
//                     bgcolor="">
//                     <h1 style="text-align: center;"><span style="font-family:tahoma,geneva,sans-serif;"><span style="color:#333333;"><span style="font-size:28px;">Thanks for contacting Credit Swag!</span></span></span></h1>
//                 </td>
//               </tr>
//             </table>
          
//             <table class="module"
//                     role="module"
//                     data-type="divider"
//                     border="0"
//                     cellpadding="0"
//                     cellspacing="0"
//                     width="100%"
//                     style="table-layout: fixed;">
//               <tr>
//                 <td style="padding:0px 0px 12px 0px;"
//                     role="module-content"
//                     height="100%"
//                     valign="top"
//                     bgcolor="">
//                   <table border="0"
//                           cellpadding="0"
//                           cellspacing="0"
//                           align="center"
//                           width="100%"
//                           height="1px"
//                           style="line-height:1px; font-size:1px;">
//                     <tr>
//                       <td
//                         style="padding: 0px 0px 1px 0px;"
//                         bgcolor="#474747"></td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>
//             </table>
          
//             <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
//               <tr>
//                 <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
//                   // <a href="https://marketing-image-production.s3.amazonaws.com/uploads/c99a049372024a675c4c8a8a83b2374ca6d12a7a65843c0a6a4e5acf4f75c3f87c571eb85aefef0161826fd9c70c60eaedbded9fe24457f2c01415f4cbfc4c98.JPG"><img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://i.ibb.co/C9VJ0Sr/Screen-Shot-2019-09-15-at-1-21-05-PM.png" alt="Credit Swag" width="600"></a>
//                 </td>
//               </tr>
//             </table>
          
//             <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
//               <tr>
//                 <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
//                     height="100%"
//                     valign="top"
//                     bgcolor="">
//                     <div>Thank&#39;s your for contacting us. Someone from our team will respons back to you shortly!&nbsp;</div>
        
//         <div>&nbsp;</div>
        
//                 </td>
//               </tr>
//             </table>
          
//             <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
//               <tr>
//                 <td style="padding:0px 0px 0px 0px;line-height:22px;text-align:inherit;"
//                     height="100%"
//                     valign="top"
//                     bgcolor="">
//                     <div style="text-align: right;"><span style="color: rgb(0, 0, 0); font-family: &quot;lucida sans unicode&quot;, &quot;lucida grande&quot;, sans-serif; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; background-color: rgb(225, 227, 228);">- Credit Swag</span></div>
        
//                 </td>
//               </tr>
//             </table>
//           <div data-role="module-unsubscribe" class="module unsubscribe-css__unsubscribe___2CDlR" role="module" data-type="unsubscribe" style="background-color:#e1e3e4;color:#444444;font-size:12px;line-height:20px;padding:16px 16px 16px 16px;text-align:center"><p style="font-family:[Sender_Name];font-size:12px;line-height:20px"><a class="Unsubscribe--unsubscribeLink" href="<%asm_group_unsubscribe_raw_url%>" style="color:#000000">Unsubscribe</a> - <a class="Unsubscribe--unsubscribePreferences" href="<%asm_preferences_raw_url%>" style="color:#000000">Unsubscribe Preferences</a></p></div>
//                                       </td>
//                                     </tr>
//                                   </table>
//                                   <!--[if mso]>
//                                   </td></tr></table>
//                                   </center>
//                                   <![endif]-->
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </table>
//                     </td>
//                   </tr>
//                 </table>
//               </div>
//             </center>
//           </body>
//         </html>
//         `
//     });
//     console.log('mail sent');    
//     return res.json('Email Sent');
// });


module.exports = router;

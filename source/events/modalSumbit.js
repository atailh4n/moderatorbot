const embed = require("../data/embeds");
const main = require("../data/main");
const { AES } = require("crypto-js");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Formatters,
} = require("discord.js");
const { client } = require("../../index");
const userSchema = require("../models/UserModel");
const { Modal, showModal, TextInputComponent } = require("discord-modals");
const guildSchema = require("../models/GuildModel");
const nodemailer = require("nodemailer");
const UserModel = require("../models/UserModel");
const db = require("quick.db");

client.on("interactionCreate", async (modal) => {
  if (modal.customId === "code-confirmer") {
    console.log("work codeess");
    const emailcode = await modal.fields.getTextInputValue("email-code");

    if (emailcode.toUpperCase() === (await client.tempemail.get(`kod.${modal.user.id}`))) {
      const email = await client.tempemail.get(`mail.${modal.user.id}`);
      const document = new userSchema({
        discordId: modal.user.id,
        email: AES.encrypt(email.toString(), process.env.CRYPTO_KEY),
        rules_accepted: true,
      });
      await document
        .save()
        .then(
          console.log(
            "🔼[ADDED USER DB] A user added to DB named " +
              modal.user.username
          )
        );
      modal.reply({
        content:
          modal.user +
          ", your code is confirmed. You can able to use bot.",
        ephemeral: true,
      });
    } else if (
      emailcode != (await client.tempemail.get(`kod.${modal.user.id}`))
    ) {
      modal.reply({
        content: modal.user + ", your code is not confirmed. Please try again.",
        ephemeral: true,
      });
    }
  } else if (modal.customId === "email-taker") {
    console.log("log changed");

    const email = modal.fields.getTextInputValue("email-popup");

    if (email.includes("gmail"))
      return modal.reply({
        content: modal.user + ", we not allow Gmail accounts. Try another.",
        ephemeral: true,
      });

    const randomstring = require("randomstring");

    const randomed = randomstring.generate({
      length: "5",
      charset: "alphanumeric",
    });

    await client.tempemail.set(
      `kod.${modal.user.id}`,
      `MDRT-${randomed.toUpperCase()}`
    );

    const timeDelayed = Date.now() + 300000;
    await client.tempemail.set(`timer.${modal.user.id}`, timeDelayed);
    await client.tempemail.set(`mail.${modal.user.id}`, email.toString());

    let transporter = nodemailer.createTransport({
      host: "moderatorbot.gq",
      port: "465",
      secure: true,
      auth: {
        user: "no.reply@moderatorbot.gq",
        pass: "ZorBey1221!",
      },
    });

    transporter
      .sendMail({
        from: "Moderator Auth System",
        to: email.toString(),
        subject: "Confirm your Moderator Account",
        html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml"><head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
            <!--[if !mso]><!-->
            <meta http-equiv="X-UA-Compatible" content="IE=Edge">
            <!--<![endif]-->
            <!--[if (gte mso 9)|(IE)]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <!--[if (gte mso 9)|(IE)]>
         <style type="text/css">
          body {width: 600px;margin: 0 auto;}
          table {border-collapse: collapse;}
          table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
          img {-ms-interpolation-mode: bicubic;}
         </style>
         <![endif]-->
            <style type="text/css">
          body, p, div {
            font-family: inherit;
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
              max-width: 100% !important;
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
            <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet"><style>
         body {font-family: 'Muli', sans-serif;}
         </style><!--End Head user entered-->
          </head>
          <body>
            <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
              <div class="webkit">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                  <tbody><tr>
                    <td valign="top" bgcolor="#FFFFFF" width="100%">
                      <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                        <tbody><tr>
                          <td width="100%">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                              <tbody><tr>
                                <td>
                                  <!--[if mso]>
          <center>
          <table><tr><td width="600">
         <![endif]-->
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                            <tbody><tr>
                                              <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
          <tbody><tr>
            <td role="module-content">
              <p></p>
            </td>
          </tr>
         </tbody></table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:30px 20px 30px 20px;" bgcolor="#f6f6f6">
          <tbody>
            <tr role="module-content">
              <td height="100%" valign="top">
                <table class="column" width="540" style="width:540px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="">
                  <tbody>
                    <tr>
                      <td style="padding:0px;margin:0px;border-spacing:0;"><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="72aac1ba-9036-4a77-b9d5-9a60d9b05cba">
          <tbody>
            <tr>
              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;" width="250" height="250" alt="" data-proportionally-constrained="true" data-responsive="false" src="https://cdn.discordapp.com/attachments/877875685652307978/882306438632964207/moderator.png">
              </td>
            </tr>
          </tbody>
         </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="331cde94-eb45-45dc-8852-b7dbeb9101d7">
          <tbody>
            <tr>
              <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="">
              </td>
            </tr>
          </tbody>
         </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8508015-a2cb-488c-9877-d46adf313282">
          <tbody>
            <tr>
              <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
              </td>
            </tr>
          </tbody>
         </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="27716fe9-ee64-4a64-94f9-a4f28bc172a0">
          <tbody>
            <tr>
              <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
              </td>
            </tr>
          </tbody>
         </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="948e3f3f-5214-4721-a90e-625a47b1c957" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 43px">Thanks for using Moderator.&nbsp;</span></div><div></div></div></td>
            </tr>
          </tbody>
         </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a10dcb57-ad22-4f4d-b765-1d427dfddb4e" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px">Please verify your email address to</span><span style="color: #000000; font-size: 18px; font-family: arial,helvetica,sans-serif"> get access Moderator.</span><span style="font-size: 18px">.</span></div>
         <div style="font-family: inherit; text-align: center"><span style="color: #5858ff; font-size: 18px"><strong>Thank you!&nbsp;</strong></span></div><div></div></div></td>
            </tr>
          </tbody>
         </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d">
          <tbody>
            <tr>
              <td style="padding:0px 0px 20px 0px;" role="module-content" bgcolor="#ffffff">
              </td>
            </tr>
          </tbody>
         </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1">
            <tbody>
              <tr>
                <td align="center" bgcolor="#ffffff" class="outer-td" style="padding:0px 0px 0px 0px;">
                  <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                    <tbody>
                      <tr>
                      <td align="center" bgcolor="#ffbe00" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d.1">
          <tbody>
            <tr>
              <td style="padding:0px 0px 50px 0px;" role="module-content" bgcolor="#ffffff">
              </td>
            </tr>
          </tbody>
         </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a265ebb9-ab9c-43e8-9009-54d6151b1600" data-mc-module-version="2019-10-22">
          <tbody>
            <tr>
              <td style="padding:50px 30px 50px 30px; line-height:22px; text-align:inherit; background-color:#6e6e6e;" height="100%" valign="top" bgcolor="#6e6e6e" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px"><strong>Here’s what happens next:</strong></span></div>
         <div style="font-family: inherit; text-align: center"><br></div>
         <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">1. You agree to the <a href="https://panel.moderatorbot.gq/privacy-policy">Privacy Policy</a>.</span></div>
         <div style="font-family: inherit; text-align: center"><br></div>
         <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">2. You are deemed to have complied with <a href="https://discord.com/terms">Discord ToS</a>.</span></div>
         <div style="font-family: inherit; text-align: center"><br></div>
         <div style="font-family: inherit; text-align: center"><br></div>
         <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">Need support? Our support team is always</span></div>
         <div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 18px">ready to help! Type /help&nbsp;</span></div><div></div></div></td>
            </tr>
          </tbody>
         </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="d050540f-4672-4f31-80d9-b395dc08abe1.1">
            <tbody>
              <tr>
                <td align="center" bgcolor="#6e6e6e" class="outer-td" style="padding:0px 0px 0px 0px;">
                  <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                    <tbody>
                      <tr>
                      <td align="center" bgcolor="#ffbe00" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                      <script>
                      function copyFunction() {
                        /* Get the text field */
                        var copyText = "MDRT-${randomed.toUpperCase()}";
                      
                        /* Select the text field */
                        copyText.select();
                        copyText.setSelectionRange(0, 99999); /* For mobile devices */
                      
                         /* Copy the text inside the text field */
                        navigator.clipboard.writeText(copyText.value);
                      
                      }
                      </script>
                        <a onclick="copyFunction()" style="background-color:#5858ff; border:1px solid #5858ff; border-color:#5858ff; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;" target="_blank">MDRT-${randomed.toUpperCase()}</a>
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c37cc5b7-79f4-4ac8-b825-9645974c984e">
          <tbody>
            <tr>
              <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="6E6E6E">
              </td>
            </tr>
          </tbody>
         </table></td>
                    </tr>
                  </tbody>
                </table>
                
              </td>
            </tr>
          </tbody>
         </table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
                                                  <div class="Unsubscribe--addressLine"><p class="Unsubscribe--senderName" style="font-size:12px; line-height:20px;">Köktürk Web Software</p><p style="font-size:12px; line-height:20px;"><span class="Unsubscribe--senderAddress">Ayazlı Neighbourhood, Melih Street, Sonçağ Site</span>, <span class="Unsubscribe--senderCity">Düzce</span>, <span class="Unsubscribe--senderState">Akçakoca</span> <span class="Unsubscribe--senderZip">81810</span></p></div>
                                                </div><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="550f60a9-c478-496c-b705-077cf7b1ba9a">
            <tbody>
              <tr>
                <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 20px 0px;">
                  <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
                    <tbody>
                      <tr>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table></td>
                                            </tr>
                                          </tbody></table>
                                          <!--[if mso]>
                                        </td>
                                      </tr>
                                    </table>
                                  </center>
                                  <![endif]-->
                                </td>
                              </tr>
                            </tbody></table>
                          </td>
                        </tr>
                      </tbody></table>
                    </td>
                  </tr>
                </tbody></table>
              </div>
            </center>
          
         
         </body></html>`,
      })
      .then(async (data, err) => {
        if (data) {
          modal.reply({
            content: "Your mail is send. Please check your inbox.",
            ephemeral: true,
          });
        }
      });
  }
});

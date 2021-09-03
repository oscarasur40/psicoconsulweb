const UserModel = require('../../models/UserModel')
const userTools = require('../../lib/userTools')
const { createHash } = require('../../lib/userTools')
const moment = require('moment')
module.exports = function (req, res) {
  console.log(req.body.username)
  var queryIn = {
    username: req.body.username
  }

  UserModel.findOne(queryIn, function (err, user) {
    if (err) {
      res.status(500).send({
        message: 'Error al buscar todos los usuarios.',
        error: err
      })
      // eslint-disable-next-line eqeqeq
    } else if (user == undefined) {
      res.status(404).send([])
    } else {
      var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var pass = "";
      for (i = 0; i < 8; i++) {
        pass += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      console.log(">>>", pass)
      const salt = userTools.createSalt()
      const password = userTools.createHash(pass, salt)
      UserModel.findByIdAndUpdate(user._id, {
        $set: {
          salt,
          password
        }
      }, function (err, usuario) {
        if (err) {
          res.status(500).send({
            message: 'Error al cambiar la contraseña. Vuelve a intentarlo.',
            error: err
          })
        } else {
          const sgMail = require('@sendgrid/mail')
          sgMail.setApiKey('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')
          const msg = {
            to: user.email, // Change to your recipient
            from: 'info@psicoconsul.net', // Change to your verified sender
            subject: 'Recuperación de contraseña psicoconsulweb',
            html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                     <head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width, initial-scale=1" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta content="telephone=no" name="format-detection">
                        <title>Nueva plantilla de correo electrónico 2021-06-13</title>
                        <!--[if (mso 16)]>
                        <style type="text/css">     a {text-decoration: none;}     </style>
                        <![endif]--> <!--[if gte mso 9]>
                        <style>sup { font-size: 100% !important; }</style>
                        <![endif]--> <!--[if gte mso 9]>
                        <xml>
                           <o:OfficeDocumentSettings>
                              <o:AllowPNG></o:AllowPNG>
                              <o:PixelsPerInch>96</o:PixelsPerInch>
                           </o:OfficeDocumentSettings>
                        </xml>
                        <![endif]--> <!--[if !mso]><!-- -->
                        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i" rel="stylesheet">
                        <!--<![endif]-->
                        <style type="text/css">#outlook a {	padding:0;}.ExternalClass {	width:100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {	line-height:100%;}.es-button {	mso-style-priority:100!important;	text-decoration:none!important;}a[x-apple-data-detectors] {	color:inherit!important;	text-decoration:none!important;	font-size:inherit!important;	font-family:inherit!important;	font-weight:inherit!important;	line-height:inherit!important;}.es-desk-hidden {	display:none;	float:left;	overflow:hidden;	width:0;	max-height:0;	line-height:0;	mso-hide:all;}[data-ogsb] .es-button {	border-width:0!important;	padding:15px 30px 15px 30px!important;}[data-ogsb] .es-button.es-button-1 {	padding:15px 30px!important;}@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1 { font-size:32px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:32px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:inline-block!important } a.es-button, button.es-button { font-size:16px!important; display:inline-block!important; border-width:15px 30px 15px 30px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }</style>
                     </head>
                     <body style="width:100%;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                        <div class="es-wrapper-color" style="background-color:#EEEEEE">
                           <!--[if gte mso 9]>
                           <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                              <v:fill type="tile" color="#eeeeee"></v:fill>
                           </v:background>
                           <![endif]-->
                           <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
                              <tr style="border-collapse:collapse">
                                 <td valign="top" style="padding:0;Margin:0">
                                    <table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                                       <tr style="border-collapse:collapse">
                                          <td align="center" style="padding:0;Margin:0">
                                             <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center">
                                                <tr style="border-collapse:collapse">
                                                   <td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px">
                                                      <!--[if mso]>
                                                      <table style="width:580px" cellpadding="0" cellspacing="0">
                                                         <tr>
                                                            <td style="width:282px" valign="top">
                                                               <![endif]-->
                                                               <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                                                  <tr style="border-collapse:collapse">
                                                                     <td align="left" style="padding:0;Margin:0;width:282px">
                                                                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                           <tr style="border-collapse:collapse">
                                                                              <td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC">
                                                                                 <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px">Correo enviado desde info@psioconsul.net<br></p>
                                                                              </td>
                                                                           </tr>
                                                                        </table>
                                                                     </td>
                                                                  </tr>
                                                               </table>
                                                               <!--[if mso]>
                                                            </td>
                                                            <td style="width:20px"></td>
                                                            <td style="width:278px" valign="top">
                                                               <![endif]--> <!--[if mso]>
                                                            </td>
                                                         </tr>
                                                      </table>
                                                      <![endif]-->
                                                   </td>
                                                </tr>
                                             </table>
                                          </td>
                                       </tr>
                                    </table>
                                    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
                                       <tr style="border-collapse:collapse">
                                          <td align="center" style="padding:0;Margin:0">
                                             <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                                <tr style="border-collapse:collapse">
                                                   <td style="Margin:0;padding-bottom:35px;padding-left:35px;padding-right:35px;padding-top:40px;background-color:#F7F7F7" bgcolor="#f7f7f7" align="left">
                                                      <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr style="border-collapse:collapse">
                                                            <td valign="top" align="center" style="padding:0;Margin:0;width:530px">
                                                               <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                  <tr style="border-collapse:collapse">
                                                                     <td align="center" style="padding:0;Margin:0;padding-bottom:15px">
                                                                        <h2 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:30px;font-style:normal;font-weight:bold;color:#333333">recuperación de contraseña</h2>
                                                                     </td>
                                                                  </tr>
                                                                  <tr style="border-collapse:collapse">
                                                                     <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px">
                                                                        <h3 style="Margin:0;line-height:22px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:18px;font-style:normal;font-weight:bold;color:#333333">&nbsp;Hola señor(a) ${user.nombre}</h3>
                                                                     </td>
                                                                  </tr>
                                                                  <tr style="border-collapse:collapse">
                                                                     <td align="left" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px">
                                                                         <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;line-height:24px;color:#777777;font-size:16px">Coordial saludo. Usted ha solicitado un cambio de contraseña el ${moment(new Date()).locale('es').format('LLL')}, Su nueva contraseña es: [${pass}]. Le recomendamos cambiar su contraseña, Y no pasarsela a nadie.</p>
                                                                     </td>
                                                                  </tr>
                                                               </table>
                                                            </td>
                                                         </tr>
                                                      </table>
                                                   </td>
                                                </tr>
                                             </table>
                                          </td>
                                       </tr>
                                    </table>
                                    <table class="es-footer" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                                       <tr style="border-collapse:collapse"></tr>
                                       <tr style="border-collapse:collapse">
                                          <td align="center" style="padding:0;Margin:0">
                                             <table class="es-footer-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#32A4CD;width:600px" cellspacing="0" cellpadding="0" bgcolor="#32a4cd" align="center">
                                                <tr style="border-collapse:collapse">
                                                   <td align="left" style="padding:0;Margin:0">
                                                      <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                         <tr style="border-collapse:collapse">
                                                            <td valign="top" align="center" style="padding:0;Margin:0;width:600px">
                                                               <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                  <tr style="border-collapse:collapse">
                                                                     <td align="center" style="padding:0;Margin:0;padding-bottom:20px;padding-top:30px">
                                                                        <h2 style="Margin:0;line-height:29px;mso-line-height-rule:exactly;font-family:'open sans', 'helvetica neue', helvetica, arial, sans-serif;font-size:24px;font-style:normal;font-weight:bold;color:#EFEFEF">&nbsp; Psicoconsulweb&nbsp;</h2>
                                                                     </td>
                                                                  </tr>
                                                               </table>
                                                            </td>
                                                         </tr>
                                                      </table>
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
                     </body>
                  </html>`,
          }
          sgMail
            .send(msg)
            .then(() => {
              console.log('Email sent')
            })
            .catch((error) => {
              console.error(error)
            })

        }
      })
    }


  })

}
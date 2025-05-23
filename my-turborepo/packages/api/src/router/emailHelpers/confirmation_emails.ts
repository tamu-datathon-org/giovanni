import { queueBulkEmail } from "./queue_bulk";

export default function sendConfirmationEmail(
  addresses: (string | undefined | null)[],
) {
  queueBulkEmail(addresses, subject, content).then();
}

// TODO: Find a way to store these without hard coding
const subject = "Registration Confirmation";

const content = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <!-- NAME: SELL PRODUCTS -->
    <!--[if gte mso 15]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
<!--    <title>For TAMU Datathon Lite 2025\n</title>-->

    <style type="text/css">
        p {
            margin: 10px 0;
            padding: 0;
        }

        table {
            border-collapse: collapse;
        }

        h1, h2, h3, h4, h5, h6 {
            display: block;
            margin: 0;
            padding: 0;
        }

        img, a img {
            border: 0;
            height: auto;
            outline: none;
            text-decoration: none;
        }

        body, #bodyTable, #bodyCell {
            height: 100%;
            margin: 0;
            padding: 0;
            width: 100%;
        }

        .mcnPreviewText {
            display: none !important;
        }

        #outlook a {
            padding: 0;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        table {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        p, a, li, td, blockquote {
            mso-line-height-rule: exactly;
        }

        a[href^=tel], a[href^=sms] {
            color: inherit;
            cursor: default;
            text-decoration: none;
        }

        p, a, li, td, body, table, blockquote {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font {
            line-height: 100%;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        table[align=left] {
            float: left;
        }

        table[align=right] {
            float: right;
        }

        .templateContainer {
            max-width: 600px !important;
        }

        a.mcnButton {
            display: block;
        }

        .mcnImage, .mcnRetinaImage {
            vertical-align: bottom;
        }

        .mcnTextContent {
            word-break: break-word;
        }

        .mcnTextContent img {
            height: auto !important;
        }

        .mcnDividerBlock {
            table-layout: fixed !important;
        }

        /*
        @tab Page
        @section Heading 1
        @style heading 1
        */
        h1 {
            /*@editable*/
            color: #5ed8a9;
            /*@editable*/
            font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            /*@editable*/
            font-size: 40px;
            /*@editable*/
            font-style: normal;
            /*@editable*/
            font-weight: bold;
            /*@editable*/
            line-height: 150%;
            /*@editable*/
            letter-spacing: normal;
            /*@editable*/
            text-align: center;
        }

        /*
        @tab Page
        @section Heading 2
        @style heading 2
        */
        h2 {
            /*@editable*/
            color: #5ed8a9;
            /*@editable*/
            font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            /*@editable*/
            font-size: 34px;
            /*@editable*/
            font-style: normal;
            /*@editable*/
            font-weight: bold;
            /*@editable*/
            line-height: 150%;
            /*@editable*/
            letter-spacing: normal;
            /*@editable*/
            text-align: left;
        }

        /*
        @tab Page
        @section Heading 3
        @style heading 3
        */
        h3 {
            /*@editable*/
            color: #5ed8a9;
            /*@editable*/
            font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            /*@editable*/
            font-size: 22px;
            /*@editable*/
            font-style: normal;
            /*@editable*/
            font-weight: bold;
            /*@editable*/
            line-height: 150%;
            /*@editable*/
            letter-spacing: normal;
            /*@editable*/
            text-align: left;
        }

        /*
        @tab Page
        @section Heading 4
        @style heading 4
        */
        h4 {
            /*@editable*/
            color: #5ed8a9;
            /*@editable*/
            font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            /*@editable*/
            font-size: 20px;
            /*@editable*/
            font-style: normal;
            /*@editable*/
            font-weight: bold;
            /*@editable*/
            line-height: 125%;
            /*@editable*/
            letter-spacing: normal;
            /*@editable*/
            text-align: left;
        }

        /*
        @tab Header
        @section Header Container Style
        */
        #templateHeader {
            /*@editable*/
            background-color: #e7efff;
            /*@editable*/
            background-image: none;
            /*@editable*/
            background-repeat: no-repeat;
            /*@editable*/
            background-position: 50% 50%;
            /*@editable*/
            background-size: cover;
            /*@editable*/
            border-top: 0;
            /*@editable*/
            border-bottom: 0;
            /*@editable*/
            padding-top: 15px;
            /*@editable*/
            padding-bottom: 15px;
        }

        /*
        @tab Header
        @section Header Interior Style
        */
        .headerContainer {
            /*@editable*/
            background-color: #transparent;
            /*@editable*/
            background-image: none;
            /*@editable*/
            background-repeat: no-repeat;
            /*@editable*/
            background-position: center;
            /*@editable*/
            background-size: cover;
            /*@editable*/
            border-top: 0;
            /*@editable*/
            border-bottom: 0;
            /*@editable*/
            padding-top: 0;
            /*@editable*/
            padding-bottom: 0;
        }

        /*
        @tab Header
        @section Header Text
        */
        .headerContainer .mcnTextContent, .headerContainer .mcnTextContent p {
            /*@editable*/
            color: #5ed8a9;
            /*@editable*/
            font-family: Helvetica;
            /*@editable*/
            font-size: 16px;
            /*@editable*/
            line-height: 150%;
            /*@editable*/
            text-align: left;
        }

        /*
        @tab Header
        @section Header Link
        */
        .headerContainer .mcnTextContent a, .headerContainer .mcnTextContent p a {
            /*@editable*/
            color: #007C89;
            /*@editable*/
            font-weight: normal;
            /*@editable*/
            text-decoration: underline;
        }

        /*
        @tab Body
        @section Body Container Style
        */
        #templateBody {
            /*@editable*/
            background-color: #e7efff;
            /*@editable*/
            background-image: none;
            /*@editable*/
            background-repeat: no-repeat;
            /*@editable*/
            background-position: center;
            /*@editable*/
            background-size: cover;
            /*@editable*/
            border-top: 0;
            /*@editable*/
            border-bottom: 0;
            /*@editable*/
            padding-top: 0px;
            /*@editable*/
            padding-bottom: 0px;
        }

        /*
        @tab Body
        @section Body Interior Style
        */
        .bodyContainer {
            /*@editable*/
            background-color: #transparent;
            /*@editable*/
            background-image: none;
            /*@editable*/
            background-repeat: no-repeat;
            /*@editable*/
            background-position: center;
            /*@editable*/
            background-size: cover;
            /*@editable*/
            border-top: 0;
            /*@editable*/
            border-bottom: 0;
            /*@editable*/
            padding-top: 0;
            /*@editable*/
            padding-bottom: 0;
        }

        /*
        @tab Body
        @section Body Text
        */
        .bodyContainer .mcnTextContent, .bodyContainer .mcnTextContent p {
            /*@editable*/
            color: #ffffff;
            /*@editable*/
            font-family: Helvetica;
            /*@editable*/
            font-size: 16px;
            /*@editable*/
            line-height: 150%;
            /*@editable*/
            text-align: left;
        }

        /*
        @tab Body
        @section Body Link
        */
        .bodyContainer .mcnTextContent a, .bodyContainer .mcnTextContent p a {
            /*@editable*/
            color: #1789dc;
            /*@editable*/
            font-weight: normal;
            /*@editable*/
            text-decoration: underline;
        }

        /*
        @tab Footer
        @section Footer Style
        */
        #templateFooter {
            /*@editable*/
            background-color: #333333;
            /*@editable*/
            background-image: none;
            /*@editable*/
            background-repeat: no-repeat;
            /*@editable*/
            background-position: center;
            /*@editable*/
            background-size: cover;
            /*@editable*/
            border-top: 0;
            /*@editable*/
            border-bottom: 0;
            /*@editable*/
            padding-top: 15px;
            /*@editable*/
            padding-bottom: 15px;
        }

        /*
        @tab Footer
        @section Footer Interior Style
        */
        .footerContainer {
            /*@editable*/
            background-color: #transparent;
            /*@editable*/
            background-image: none;
            /*@editable*/
            background-repeat: no-repeat;
            /*@editable*/
            background-position: center;
            /*@editable*/
            background-size: cover;
            /*@editable*/
            border-top: 0;
            /*@editable*/
            border-bottom: 0;
            /*@editable*/
            padding-top: 0;
            /*@editable*/
            padding-bottom: 0;
        }

        /*
        @tab Footer
        @section Footer Text
        */
        .footerContainer .mcnTextContent, .footerContainer .mcnTextContent p {
            /*@editable*/
            color: #FFFFFF;
            /*@editable*/
            font-family: Helvetica;
            /*@editable*/
            font-size: 12px;
            /*@editable*/
            line-height: 150%;
            /*@editable*/
            text-align: center;
        }

        /*
        @tab Footer
        @section Footer Link
        */
        .footerContainer .mcnTextContent a, .footerContainer .mcnTextContent p a {
            /*@editable*/
            color: #FFFFFF;
            /*@editable*/
            font-weight: normal;
            /*@editable*/
            text-decoration: underline;
        }

        @media only screen and (min-width: 768px) {
            .templateContainer {
                width: 600px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            body, table, td, p, a, li, blockquote {
                -webkit-text-size-adjust: none !important;
            }

        }

        @media only screen and (max-width: 480px) {
            body {
                width: 100% !important;
                min-width: 100% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnRetinaImage {
                max-width: 100% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImage {
                width: 100% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnCartContainer, .mcnCaptionTopContent, .mcnRecContentContainer, .mcnCaptionBottomContent, .mcnTextContentContainer, .mcnBoxedTextContentContainer, .mcnImageGroupContentContainer, .mcnCaptionLeftTextContentContainer, .mcnCaptionRightTextContentContainer, .mcnCaptionLeftImageContentContainer, .mcnCaptionRightImageContentContainer, .mcnImageCardLeftTextContentContainer, .mcnImageCardRightTextContentContainer, .mcnImageCardLeftImageContentContainer, .mcnImageCardRightImageContentContainer {
                max-width: 100% !important;
                width: 100% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnBoxedTextContentContainer {
                min-width: 100% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImageGroupContent {
                padding: 9px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnCaptionLeftContentOuter .mcnTextContent, .mcnCaptionRightContentOuter .mcnTextContent {
                padding-top: 9px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImageCardTopImageContent, .mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent, .mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
                padding-top: 18px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImageCardBottomImageContent {
                padding-bottom: 9px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImageGroupBlockInner {
                padding-top: 0 !important;
                padding-bottom: 0 !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImageGroupBlockOuter {
                padding-top: 9px !important;
                padding-bottom: 9px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnTextContent, .mcnBoxedTextContentColumn {
                padding-right: 18px !important;
                padding-left: 18px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcnImageCardLeftImageContent, .mcnImageCardRightImageContent {
                padding-right: 18px !important;
                padding-bottom: 0 !important;
                padding-left: 18px !important;
            }

        }

        @media only screen and (max-width: 480px) {
            .mcpreview-image-uploader {
                display: none !important;
                width: 100% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Heading 1
            @tip Make the first-level headings larger in size for better readability on small screens.
            */
            h1 {
                /*@editable*/
                font-size: 30px !important;
                /*@editable*/
                line-height: 125% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Heading 2
            @tip Make the second-level headings larger in size for better readability on small screens.
            */
            h2 {
                /*@editable*/
                font-size: 26px !important;
                /*@editable*/
                line-height: 125% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Heading 3
            @tip Make the third-level headings larger in size for better readability on small screens.
            */
            h3 {
                /*@editable*/
                font-size: 20px !important;
                /*@editable*/
                line-height: 150% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Heading 4
            @tip Make the fourth-level headings larger in size for better readability on small screens.
            */
            h4 {
                /*@editable*/
                font-size: 18px !important;
                /*@editable*/
                line-height: 150% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Boxed Text
            @tip Make the boxed text larger in size for better readability on small screens. We recommend a font size of at least 16px.
            */
            .mcnBoxedTextContentContainer .mcnTextContent, .mcnBoxedTextContentContainer .mcnTextContent p {
                /*@editable*/
                font-size: 14px !important;
                /*@editable*/
                line-height: 150% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Header Text
            @tip Make the header text larger in size for better readability on small screens.
            */
            .headerContainer .mcnTextContent, .headerContainer .mcnTextContent p {
                /*@editable*/
                font-size: 16px !important;
                /*@editable*/
                line-height: 150% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Body Text
            @tip Make the body text larger in size for better readability on small screens. We recommend a font size of at least 16px.
            */
            .bodyContainer .mcnTextContent, .bodyContainer .mcnTextContent p {
                /*@editable*/
                font-size: 16px !important;
                /*@editable*/
                line-height: 150% !important;
            }

        }

        @media only screen and (max-width: 480px) {
            /*
            @tab Mobile Styles
            @section Footer Text
            @tip Make the footer content text larger in size for better readability on small screens.
            */
            .footerContainer .mcnTextContent, .footerContainer .mcnTextContent p {
                /*@editable*/
                font-size: 14px !important;
                /*@editable*/
                line-height: 150% !important;
            }

        }</style>
</head>
<body>
<center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
        <tr>
            <td align="center" valign="top" id="bodyCell">
                <!-- BEGIN TEMPLATE // -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" valign="top" id="templateHeader" data-template-container>
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"
                                   style="width:600px;">
                                <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   class="templateContainer">
                                <tr>
                                    <td valign="top" class="headerContainer">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnCaptionBlock">
                                            <tbody class="mcnCaptionBlockOuter">
                                            <tr>
                                                <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">


                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                           class="mcnCaptionRightContentOuter" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" class="mcnCaptionRightContentInner"
                                                                style="padding:0 9px ;">
                                                                <table align="left" border="0" cellpadding="0"
                                                                       cellspacing="0"
                                                                       class="mcnCaptionRightImageContentContainer"
                                                                       width="132">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="mcnCaptionRightImageContent"
                                                                            align="center" valign="top">


                                                                            <img alt=""
                                                                                 src="https://mcusercontent.com/36d73585139760aa245837bb2/images/414fa53d-de89-4184-9477-faefac39d22e.png"
                                                                                 width="132"
                                                                                 style="max-width: 6000px; border: 1px none; border-radius: 0%;"
                                                                                 class="mcnImage">


                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table class="mcnCaptionRightTextContentContainer"
                                                                       align="right" border="0" cellpadding="0"
                                                                       cellspacing="0" width="396">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td valign="top" class="mcnTextContent"
                                                                            style="text-align: left;">
                                                                            <br>
                                                                            <br>
                                                                            <span style="font-size:44px"><strong><span
                                                                                    style="color:#2c41db"><span
                                                                                    style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp; </span></span></strong></span><span
                                                                                style="font-size:43px"><strong><span
                                                                                style="color:#2c41db"><span
                                                                                style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">TAMU DATATHON</span></span></strong></span>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>


                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" id="templateBody" data-template-container>
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"
                                   style="width:600px;">
                                <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   class="templateContainer">
                                <tr>
                                    <td valign="top" class="bodyContainer">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnTextBlock" style="min-width:100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                           width="100%" style="width:100%;">
                                                        <tr>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                           style="max-width:100%; min-width:100%;" width="100%"
                                                           class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent"
                                                                style="padding: 0px 18px 9px;color: #5ED8A9;">

                                                                <div style="text-align: center;"><span
                                                                        style="font-size:35px"><strong><span
                                                                        style="color:#2c41db"><span
                                                                        style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">You're registered!</span></span></strong></span>
                                                                </div>

                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnTextBlock" style="min-width:100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                           width="100%" style="width:100%;">
                                                        <tr>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                           style="max-width:100%; min-width:100%;" width="100%"
                                                           class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent"
                                                                style="padding: 0px 18px 9px;color: #FFFFFF;text-align: left;">

                            <span style="font-size:17px"><span
                                    style="font-family:lato,helvetica neue,helvetica,arial,sans-serif"><span
                                    style="color:#555555">Thanks for applying to the TAMU Datathon Lite 2025! We'll be carefully reviewing your application and will get back to you soon.<br>
<br>
Until then, please reach out to <a href="mailto:connect@tamudatathon.com" target="_blank">connect@tamudatathon.com</a> if you have any other questions!</span></span></span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnTextBlock" style="min-width:100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                           width="100%" style="width:100%;">
                                                        <tr>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                           style="max-width:100%; min-width:100%;" width="100%"
                                                           class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent"
                                                                style="padding: 0px 18px 9px;color: #FFFFFF;text-align: center;">


                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnButtonBlock" style="min-width:100%;">
                                            <tbody class="mcnButtonBlockOuter">
                                            <tr>
                                                <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;"
                                                    valign="top" align="center" class="mcnButtonBlockInner">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                           class="mcnButtonContentContainer"
                                                           style="border-collapse: separate !important;border-radius: 11px;background-color: #627EFD;">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center" valign="middle" class="mcnButtonContent"
                                                                style="font-family: Lato, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 18px; padding: 18px;">
                                                                <a class="mcnButton " title="TD Website"
                                                                   href="https://tamudatathon.com" target="_blank"
                                                                   style="font-weight: bold;letter-spacing: -0.5px;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;">TD
                                                                    Website</a>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnDividerBlock" style="min-width:100%;">
                                            <tbody class="mcnDividerBlockOuter">
                                            <tr>
                                                <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                                    <table class="mcnDividerContent" border="0" cellpadding="0"
                                                           cellspacing="0" width="100%" style="min-width:100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <span></span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--
                                                                    <td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                    <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                                                    -->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnDividerBlock" style="min-width:100%;">
                                            <tbody class="mcnDividerBlockOuter">
                                            <tr>
                                                <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                                    <table class="mcnDividerContent" border="0" cellpadding="0"
                                                           cellspacing="0" width="100%"
                                                           style="min-width: 100%;border-top: 2px solid #6C6CE2;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <span></span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--
                                                                    <td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                    <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                                                    -->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnCaptionBlock">
                                            <tbody class="mcnCaptionBlockOuter">
                                            <tr>
                                                <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">


                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                           class="mcnCaptionLeftContentOuter" width="100%">
                                                        <tbody>
                                                        <tr>
                                                            <td valign="top" class="mcnCaptionLeftContentInner"
                                                                style="padding:0 9px ;">
                                                                <table align="right" border="0" cellpadding="0"
                                                                       cellspacing="0"
                                                                       class="mcnCaptionLeftImageContentContainer"
                                                                       width="176">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td class="mcnCaptionLeftImageContent"
                                                                            align="center" valign="top">


                                                                            <img alt=""
                                                                                 src="https://mcusercontent.com/36d73585139760aa245837bb2/images/386e8ab8-96d9-7b1f-c2fe-e999573fcbb6.png"
                                                                                 width="176" style="max-width:5959px;"
                                                                                 class="mcnImage">


                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                                <table class="mcnCaptionLeftTextContentContainer"
                                                                       align="left" border="0" cellpadding="0"
                                                                       cellspacing="0" width="352">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td valign="top" class="mcnTextContent"
                                                                            style="color: #FFFFFF;font-size: 24px;text-align: left;">
                                                                            <p style="font-size: 24px;color: #FFFFFF;text-align: left;">
                                                                                <span style="color:#627efd"><span
                                                                                        style="font-size:22px"><strong><span
                                                                                        style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Thanks and Gig'em,</span></strong></span></span><br>
                                                                                <strong><span
                                                                                        style="color:#2c41db"><span
                                                                                        style="font-size:24px"><span
                                                                                        style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; TAMU Datathon</span></span></span></strong>
                                                                            </p>

                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>


                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" id="templateFooter" data-template-container>
                            <!--[if (gte mso 9)|(IE)]>
                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600"
                                   style="width:600px;">
                                <tr>
                                    <td align="center" valign="top" width="600" style="width:600px;">
                            <![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   class="templateContainer">
                                <tr>
                                    <td valign="top" class="footerContainer">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnFollowBlock" style="min-width:100%;">
                                            <tbody class="mcnFollowBlockOuter">
                                            <tr>
                                                <td align="center" valign="top" style="padding:9px"
                                                    class="mcnFollowBlockInner">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                           class="mcnFollowContentContainer" style="min-width:100%;">
                                                        <tbody>
                                                        <tr>
                                                            <td align="center"
                                                                style="padding-left:9px;padding-right:9px;">
                                                                <table border="0" cellpadding="0" cellspacing="0"
                                                                       width="100%" style="min-width:100%;"
                                                                       class="mcnFollowContent">
                                                                    <tbody>
                                                                    <tr>
                                                                        <td align="center" valign="top"
                                                                            style="padding-top:9px; padding-right:9px; padding-left:9px;">
                                                                            <table align="center" border="0"
                                                                                   cellpadding="0" cellspacing="0">
                                                                                <tbody>
                                                                                <tr>
                                                                                    <td align="center" valign="top">
                                                                                        <!--[if mso]>
                                                                                        <table align="center" border="0"
                                                                                               cellspacing="0"
                                                                                               cellpadding="0">
                                                                                            <tr>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:10px; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://github.com/tamu-datathon-org"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-github-48.png"
                                                                                                                                    alt="GitHub"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:10px; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://tamudatathon.com/"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png"
                                                                                                                                    alt="Website"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:10px; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://www.instagram.com/tamudatathon/"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png"
                                                                                                                                    alt="Link"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:10px; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://www.facebook.com/tamudatathon/"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png"
                                                                                                                                    alt="Facebook"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:10px; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://twitter.com/tamudatathon/"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png"
                                                                                                                                    alt="Twitter"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:10px; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://medium.com/@tamudatathon"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-medium-48.png"
                                                                                                                                    alt="Medium"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        <td align="center" valign="top">
                                                                                        <![endif]-->


                                                                                        <table align="left" border="0"
                                                                                               cellpadding="0"
                                                                                               cellspacing="0"
                                                                                               style="display:inline;">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td valign="top"
                                                                                                    style="padding-right:0; padding-bottom:9px;"
                                                                                                    class="mcnFollowContentItemContainer">
                                                                                                    <table border="0"
                                                                                                           cellpadding="0"
                                                                                                           cellspacing="0"
                                                                                                           width="100%"
                                                                                                           class="mcnFollowContentItem">
                                                                                                        <tbody>
                                                                                                        <tr>
                                                                                                            <td align="left"
                                                                                                                valign="middle"
                                                                                                                style="padding-top:5px; padding-right:10px; padding-bottom:5px; padding-left:9px;">
                                                                                                                <table align="left"
                                                                                                                       border="0"
                                                                                                                       cellpadding="0"
                                                                                                                       cellspacing="0"
                                                                                                                       width="">
                                                                                                                    <tbody>
                                                                                                                    <tr>

                                                                                                                        <td align="center"
                                                                                                                            valign="middle"
                                                                                                                            width="24"
                                                                                                                            class="mcnFollowIconContent">
                                                                                                                            <a href="https://www.linkedin.com/company/tamudatathon/"
                                                                                                                               target="_blank"><img
                                                                                                                                    src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-linkedin-48.png"
                                                                                                                                    alt="LinkedIn"
                                                                                                                                    style="display:block;"
                                                                                                                                    height="24"
                                                                                                                                    width="24"
                                                                                                                                    class=""></a>
                                                                                                                        </td>


                                                                                                                    </tr>
                                                                                                                    </tbody>
                                                                                                                </table>
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>

                                                                                        <!--[if mso]>
                                                                                        </td>
                                                                                        <![endif]-->

                                                                                        <!--[if mso]>
                                                                                        </tr>
                                                                                        </table>
                                                                                        <![endif]-->
                                                                                    </td>
                                                                                </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>

                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnDividerBlock" style="min-width:100%;">
                                            <tbody class="mcnDividerBlockOuter">
                                            <tr>
                                                <td class="mcnDividerBlockInner" style="min-width:100%; padding:18px;">
                                                    <table class="mcnDividerContent" border="0" cellpadding="0"
                                                           cellspacing="0" width="100%"
                                                           style="min-width: 100%;border-top: 2px solid #505050;">
                                                        <tbody>
                                                        <tr>
                                                            <td>
                                                                <span></span>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--
                                                                    <td class="mcnDividerBlockInner" style="padding: 18px;">
                                                                    <hr class="mcnDividerContent" style="border-bottom-color:none; border-left-color:none; border-right-color:none; border-bottom-width:0; border-left-width:0; border-right-width:0; margin-top:0; margin-right:0; margin-bottom:0; margin-left:0;" />
                                                    -->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                               class="mcnTextBlock" style="min-width:100%;">
                                            <tbody class="mcnTextBlockOuter">
                                            <tr>
                                                <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                                                    <!--[if mso]>
                                                    <table align="left" border="0" cellspacing="0" cellpadding="0"
                                                           width="100%" style="width:100%;">
                                                        <tr>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    <td valign="top" width="600" style="width:600px;">
                                                    <![endif]-->
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                           style="max-width:100%; min-width:100%;" width="100%"
                                                           class="mcnTextContentContainer">
                                                        <tbody>
                                                        <tr>

                                                            <td valign="top" class="mcnTextContent"
                                                                style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;">

                                                                <em>Copyright © 2025 TAMU Datathon All rights
                                                                    reserved.</em>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <!--[if mso]>
                                                    </td>
                                                    <![endif]-->

                                                    <!--[if mso]>
                                                    </tr>
                                                    </table>
                                                    <![endif]-->
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!--[if (gte mso 9)|(IE)]>
                            </td>
                            </tr>
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                </table>
                <!-- // END TEMPLATE -->
            </td>
        </tr>
    </table>
</center>
<script type="text/javascript" src="/fHK6_d/IoQmc_/liyupn/zCSr/yHbBU/7JiptfhfhQb6/Lg88Mg/NUs7/ETIfMAIC"></script>
</body>
</html>
`;

export const accepted_title = `Congratulations on being accepted to TAMU Datathon Lite 2025!`;

export const accepted_content = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head><!-- NAME: SELL PRODUCTS -->
  <!--[if gte mso 15]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    p {
      margin: 10px 0;
      padding: 0;
    }

    table {
      border-collapse: collapse;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      display: block;
      margin: 0;
      padding: 0;
    }

    img,
    a img {
      border: 0;
      height: auto;
      outline: none;
      text-decoration: none;
    }

    body,
    #bodyTable,
    #bodyCell {
      height: 100%;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .mcnPreviewText {
      display: none !important;
    }

    #outlook a {
      padding: 0;
    }

    img {
      -ms-interpolation-mode: bicubic;
    }

    table {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    p,
    a,
    li,
    td,
    blockquote {
      mso-line-height-rule: exactly;
    }

    a[href^=tel],
    a[href^=sms] {
      color: inherit;
      cursor: default;
      text-decoration: none;
    }

    p,
    a,
    li,
    td,
    body,
    table,
    blockquote {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    table[align=left] {
      float: left;
    }

    table[align=right] {
      float: right;
    }

    .templateContainer {
      max-width: 600px !important;
    }

    a.mcnButton {
      display: block;
    }

    .mcnImage,
    .mcnRetinaImage {
      vertical-align: bottom;
    }

    .mcnTextContent {
      word-break: break-word;
    }

    .mcnTextContent img {
      height: auto !important;
    }

    .mcnDividerBlock {
      table-layout: fixed !important;
    }

    h1 {
      color: #5ed8a9;
      font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 40px;
      font-style: normal;
      font-weight: bold;
      line-height: 150%;
      letter-spacing: normal;
      text-align: center;
    }

    h2 {
      color: #5ed8a9;
      font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 34px;
      font-style: normal;
      font-weight: bold;
      line-height: 150%;
      letter-spacing: normal;
      text-align: left;
    }

    h3 {
      color: #5ed8a9;
      font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 22px;
      font-style: normal;
      font-weight: bold;
      line-height: 150%;
      letter-spacing: normal;
      text-align: left;
    }

    h4 {
      color: #5ed8a9;
      font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 20px;
      font-style: normal;
      font-weight: bold;
      line-height: 125%;
      letter-spacing: normal;
      text-align: left;
    }

    #templateHeader {
      background-color: #e7efff;
      background-image: none;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .headerContainer {
      background-color: #transparent;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    .headerContainer .mcnTextContent,
    .headerContainer .mcnTextContent p {
      color: #5ed8a9;
      font-family: Helvetica;
      font-size: 16px;
      line-height: 150%;
      text-align: left;
    }

    .headerContainer .mcnTextContent a,
    .headerContainer .mcnTextContent p a {
      color: #007C89;
      font-weight: normal;
      text-decoration: underline;
    }

    #templateBody {
      background-color: #e7efff;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 0px;
      padding-bottom: 0px;
    }

    .bodyContainer {
      background-color: #transparent;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    .bodyContainer .mcnTextContent,
    .bodyContainer .mcnTextContent p {
      color: #ffffff;
      font-family: Helvetica;
      font-size: 16px;
      line-height: 150%;
      text-align: left;
    }

    .bodyContainer .mcnTextContent a,
    .bodyContainer .mcnTextContent p a {
      color: #1789dc;
      font-weight: normal;
      text-decoration: underline;
    }

    #templateFooter {
      background-color: #333333;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .footerContainer {
      background-color: #transparent;
      background-image: none;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-top: 0;
      border-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }

    .footerContainer .mcnTextContent,
    .footerContainer .mcnTextContent p {
      color: #FFFFFF;
      font-family: Helvetica;
      font-size: 12px;
      line-height: 150%;
      text-align: center;
    }

    .footerContainer .mcnTextContent a,
    .footerContainer .mcnTextContent p a {
      color: #FFFFFF;
      font-weight: normal;
      text-decoration: underline;
    }

    @media only screen and (min-width:768px) {
      .templateContainer {
        width: 600px !important;
      }
    }

    @media only screen and (max-width:480px) {

      body,
      table,
      td,
      p,
      a,
      li,
      blockquote {
        -webkit-text-size-adjust: none !important;
      }
    }

    @media only screen and (max-width:480px) {
      body {
        width: 100% !important;
        min-width: 100% !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnRetinaImage {
        max-width: 100% !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnImage {
        width: 100% !important;
      }
    }

    @media only screen and (max-width:480px) {

      .mcnCartContainer,
      .mcnCaptionTopContent,
      .mcnRecContentContainer,
      .mcnCaptionBottomContent,
      .mcnTextContentContainer,
      .mcnBoxedTextContentContainer,
      .mcnImageGroupContentContainer,
      .mcnCaptionLeftTextContentContainer,
      .mcnCaptionRightTextContentContainer,
      .mcnCaptionLeftImageContentContainer,
      .mcnCaptionRightImageContentContainer,
      .mcnImageCardLeftTextContentContainer,
      .mcnImageCardRightTextContentContainer,
      .mcnImageCardLeftImageContentContainer,
      .mcnImageCardRightImageContentContainer {
        max-width: 100% !important;
        width: 100% !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnBoxedTextContentContainer {
        min-width: 100% !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnImageGroupContent {
        padding: 9px !important;
      }
    }

    @media only screen and (max-width:480px) {

      .mcnCaptionLeftContentOuter .mcnTextContent,
      .mcnCaptionRightContentOuter .mcnTextContent {
        padding-top: 9px !important;
      }
    }

    @media only screen and (max-width:480px) {

      .mcnImageCardTopImageContent,
      .mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,
      .mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent {
        padding-top: 18px !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnImageCardBottomImageContent {
        padding-bottom: 9px !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnImageGroupBlockInner {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcnImageGroupBlockOuter {
        padding-top: 9px !important;
        padding-bottom: 9px !important;
      }
    }

    @media only screen and (max-width:480px) {

      .mcnTextContent,
      .mcnBoxedTextContentColumn {
        padding-right: 18px !important;
        padding-left: 18px !important;
      }
    }

    @media only screen and (max-width:480px) {

      .mcnImageCardLeftImageContent,
      .mcnImageCardRightImageContent {
        padding-right: 18px !important;
        padding-bottom: 0 !important;
        padding-left: 18px !important;
      }
    }

    @media only screen and (max-width:480px) {
      .mcpreview-image-uploader {
        display: none !important;
        width: 100% !important;
      }
    }

    @media only screen and (max-width:480px) {
      h1 {
        font-size: 30px !important;
        line-height: 125% !important;
      }
    }

    @media only screen and (max-width:480px) {
      h2 {
        font-size: 26px !important;
        line-height: 125% !important;
      }
    }

    @media only screen and (max-width:480px) {
      h3 {
        font-size: 20px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width:480px) {
      h4 {
        font-size: 18px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width:480px) {

      .mcnBoxedTextContentContainer .mcnTextContent,
      .mcnBoxedTextContentContainer .mcnTextContent p {
        font-size: 14px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width:480px) {

      .headerContainer .mcnTextContent,
      .headerContainer .mcnTextContent p {
        font-size: 16px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width:480px) {

      .bodyContainer .mcnTextContent,
      .bodyContainer .mcnTextContent p {
        font-size: 16px !important;
        line-height: 150% !important;
      }
    }

    @media only screen and (max-width:480px) {

      .footerContainer .mcnTextContent,
      .footerContainer .mcnTextContent p {
        font-size: 14px !important;
        line-height: 150% !important;
      }
    }
  </style>
</head>

<body>
  <center>
    <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
      <tr>
        <td align="center" valign="top" id="bodyCell"><!-- BEGIN TEMPLATE // -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" valign="top" id="templateHeader" data-template-container>
                <!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;"><tr><td align="center" valign="top" width="600" style="width:600px;">
<![endif]-->
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                  <tr>
                    <td valign="top" class="headerContainer">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
                        <tbody class="mcnCaptionBlockOuter">
                          <tr>
                            <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
                              <table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter"
                                width="100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px;">
                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                        class="mcnCaptionRightImageContentContainer" width="132">
                                        <tbody>
                                          <tr>
                                            <td class="mcnCaptionRightImageContent" align="center" valign="top"> <img
                                                alt=""
                                                src="https://mcusercontent.com/36d73585139760aa245837bb2/images/414fa53d-de89-4184-9477-faefac39d22e.png"
                                                width="132" style="max-width:6000px;border:1px none;border-radius:0%;"
                                                class="mcnImage">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="mcnCaptionRightTextContentContainer" align="right" border="0"
                                        cellpadding="0" cellspacing="0" width="396">
                                        <tbody>
                                          <tr>
                                            <td valign="top" class="mcnTextContent" style="text-align:left;"> <br> <br>
                                              <span style="font-size:44px"><strong><span style="color:#2c41db"><span
                                                      style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp;
                                                    </span></span></strong></span><span
                                                style="font-size:43px"><strong><span style="color:#2c41db"><span style="font-family:lato,helvetica
neue,helvetica,arial,sans-serif">TAMU DATATHON</span></span></strong></span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
              </td>
            </tr>
            <tr>
              <td align="center" valign="top" id="templateBody" data-template-container>
                <!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;"><tr><td align="center" valign="top" width="600" style="width:600px;">
<![endif]-->
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                  <tr>
                    <td valign="top" class="bodyContainer">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                        style="min-width:100%;">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
                              <!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
                              <table align="left" border="0" cellpadding="0" cellspacing="0"
                                style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="mcnTextContent" style="padding:0px 18px 9px;color:#5ED8A9;">
                                      <div style="text-align:center;"><span style="font-size:35px"><strong><span
                                              style="color:#2c41db"><span
                                                style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">Howdy!</span></span></strong></span>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]>
</td>
<![endif]-->
                              <!--[if mso]></tr></table>
<![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                        style="min-width:100%;">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
                              <!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
                              <table align="left" border="0" cellpadding="0" cellspacing="0"
                                style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="mcnTextContent"
                                      style="padding:0px 18px 9px;color:#FFFFFF;text-align:left;"> <span
                                        style="font-size:17px"><span
                                          style="font-family:lato,helvetica neue,helvetica,arial,sans-serif"><span
                                            style="color:#555555">Congratulations!<br> We’re excited to inform you that
                                            you’ve been accepted to the TAMU Datathon Lite 2025! Your
                                            application truly impressed us, and we can’t wait to see you this weekend,
                                            April 5, 2025. 
                                            <br><br>
                                            <b>Check-in</b> is from <b>8:00 AM to 9:00 AM</b> at the ILCB lobby. Then, make your way to the <b>ILCB 229</b> for the opening ceremony at 9:00 AM.</span></span></span>
                                            </span>
                                          </span>
                                        </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]>
</td>
<![endif]-->
                              <!--[if mso]></tr></table>
<![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                        style="min-width:100%;">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
                              <!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
                              <table align="left" border="0" cellpadding="0" cellspacing="0"
                                style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="mcnTextContent"
                                      style="padding:0px 18px 9px;color:#FFFFFF;text-align:center;">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]>
</td>
<![endif]-->
                              <!--[if mso]></tr></table>
<![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock"
                        style="min-width:100%;">
                        <tbody class="mcnButtonBlockOuter">
                          <tr>
                            <td style="padding-top:0;padding-right:18px;padding-bottom:18px;padding-left:18px;"
                              valign="top" align="center" class="mcnButtonBlockInner">
                              <table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer"
                                style="border-collapse:separate!important;border-radius:11px;background-color:#627EFD;">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="middle" class="mcnButtonContent"
                                      style="font-family:Lato,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-size:18px;padding:18px;">
                                      <a class="mcnButton " title="TD Website" href="https://tamudatathon.com"
                                        target="_blank" style="font-weight:bold;letter-spacing:-0.5px;line-height:
100%;text-align:center;text-decoration:none;color:#FFFFFF;">TD Website</a>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"
                        style="min-width:100%;">
                        <tbody class="mcnDividerBlockOuter">
                          <tr>
                            <td class="mcnDividerBlockInner" style="min-width:100%;padding:18px;">
                              <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="min-width:100%;">
                                <tbody>
                                  <tr>
                                    <td> <span></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!-- <td class="mcnDividerBlockInner" style="padding:18px;"><hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;"/> -->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"
                        style="min-width:100%;">
                        <tbody class="mcnDividerBlockOuter">
                          <tr>
                            <td class="mcnDividerBlockInner" style="min-width:100%;padding:18px;">
                              <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="min-width:100%;border-top:2px solid #6C6CE2;">
                                <tbody>
                                  <tr>
                                    <td> <span></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!-- <td class="mcnDividerBlockInner" style="padding:18px;"><hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;"/> -->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock">
                        <tbody class="mcnCaptionBlockOuter">
                          <tr>
                            <td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
                              <table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionLeftContentOuter"
                                width="100%">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="mcnCaptionLeftContentInner" style="padding:0 9px;">
                                      <table align="right" border="0" cellpadding="0" cellspacing="0"
                                        class="mcnCaptionLeftImageContentContainer" width="176">
                                        <tbody>
                                          <tr>
                                            <td class="mcnCaptionLeftImageContent" align="center" valign="top"> <img
                                                alt=""
                                                src="https://mcusercontent.com/36d73585139760aa245837bb2/images/386e8ab8-96d9-7b1f-c2fe-e999573fcbb6.png"
                                                width="176" style="max-width:5959px;" class="mcnImage">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      <table class="mcnCaptionLeftTextContentContainer" align="left" border="0"
                                        cellpadding="0" cellspacing="0" width="352">
                                        <tbody>
                                          <tr>
                                            <td valign="top" class="mcnTextContent"
                                              style="color:#FFFFFF;font-size:24px;text-align:left;">
                                              <p style="font-size:24px;color:#FFFFFF;text-align:left;"><span
                                                  style="color:#627efd"><span style="font-size:22px"><strong><span
                                                        style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp;
                                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Thanks
                                                        and
                                                        Gig'em,</span></strong></span></span><br> <strong><span
                                                    style="color:#2c41db"><span style="font-size:24px"><span
                                                        style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp;
                                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; TAMU
                                                        Datathon</span></span></span></strong></p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
              </td>
            </tr>
            <tr>
              <td align="center" valign="top" id="templateFooter" data-template-container>
                <!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;"><tr><td align="center" valign="top" width="600" style="width:600px;">
<![endif]-->
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer">
                  <tr>
                    <td valign="top" class="footerContainer">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock"
                        style="min-width:100%;">
                        <tbody class="mcnFollowBlockOuter">
                          <tr>
                            <td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                class="mcnFollowContentContainer" style="min-width:100%;">
                                <tbody>
                                  <tr>
                                    <td align="center" style="padding-left:9px;padding-right:9px;">
                                      <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                        style="min-width:100%;" class="mcnFollowContent">
                                        <tbody>
                                          <tr>
                                            <td align="center" valign="top"
                                              style="padding-top:9px;padding-right:9px;padding-left:9px;">
                                              <table align="center" border="0" cellpadding="0" cellspacing="0">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" valign="top">
                                                      <!--[if mso]>
<table align="center" border="0" cellspacing="0" cellpadding="0"><tr>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top"
                                                              style="padding-right:10px;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://github.com/tamu-datathon-org"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-github-48.png"
                                                                                  alt="GitHub" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top"
                                                              style="padding-right:10px;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://tamudatathon.com/"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png"
                                                                                  alt="Website" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top"
                                                              style="padding-right:10px;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://www.instagram.com/tamudatathon/"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png"
                                                                                  alt="Link" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top"
                                                              style="padding-right:10px;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://www.facebook.com/tamudatathon/"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png"
                                                                                  alt="Facebook" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top"
                                                              style="padding-right:10px;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://twitter.com/tamudatathon/"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png"
                                                                                  alt="Twitter" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top"
                                                              style="padding-right:10px;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://medium.com/@tamudatathon"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-medium-48.png"
                                                                                  alt="Medium" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]><td align="center" valign="top">
<![endif]-->
                                                      <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                        class="mcnBlockFloatLeft" style="display:inline;">
                                                        <tbody>
                                                          <tr>
                                                            <td valign="top" style="padding-right:0;padding-bottom:9px;"
                                                              class="mcnFollowContentItemContainer">
                                                              <table border="0" cellpadding="0" cellspacing="0"
                                                                width="100%" class="mcnFollowContentItem">
                                                                <tbody>
                                                                  <tr>
                                                                    <td align="left" valign="middle"
                                                                      style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
                                                                      <table align="left" border="0" cellpadding="0"
                                                                        cellspacing="0" width="">
                                                                        <tbody>
                                                                          <tr>
                                                                            <td align="center" valign="middle"
                                                                              width="24" class="mcnFollowIconContent">
                                                                              <a href="https://www.linkedin.com/company/tamudatathon/"
                                                                                target="_blank"><img
                                                                                  src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-linkedin-48.png"
                                                                                  alt="LinkedIn" style="display:block;"
                                                                                  height="24" width="24" class=""></a>
                                                                            </td>
                                                                          </tr>
                                                                        </tbody>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </tbody>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                      <!--[if mso]>
</td>
<![endif]-->
                                                      <!--[if mso]></tr></table>
<![endif]-->
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock"
                        style="min-width:100%;">
                        <tbody class="mcnDividerBlockOuter">
                          <tr>
                            <td class="mcnDividerBlockInner" style="min-width:100%;padding:18px;">
                              <table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%"
                                style="min-width:100%;border-top:2px solid #505050;">
                                <tbody>
                                  <tr>
                                    <td> <span></span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!-- <td class="mcnDividerBlockInner" style="padding:18px;"><hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;"/> -->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock"
                        style="min-width:100%;">
                        <tbody class="mcnTextBlockOuter">
                          <tr>
                            <td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
                              <!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
                              <!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
                              <table align="left" border="0" cellpadding="0" cellspacing="0"
                                style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer">
                                <tbody>
                                  <tr>
                                    <td valign="top" class="mcnTextContent"
                                      style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;">
                                      <em>Copyright © 2025 TAMU Datathon All rights reserved.</em>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]>
</td>
<![endif]-->
                              <!--[if mso]></tr></table>
<![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
              </td>
            </tr>
          </table><!-- // END TEMPLATE -->
        </td>
      </tr>
    </table>
  </center>
  <script type="text/javascript" src="/PhGe4s/_b/yr/D-n0/DqUZP7gD5k/DEh9kkVwmDmpD3b5/KSsCAQ/T34J/R1BJKCwB"></script>
</body>
</html>
`;

export const rejected_title = `TAMU Datathon Application Status Update`;
export const rejected_content = `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head><!-- NAME: SELL PRODUCTS -->
<!--[if gte mso 15]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
<![endif]-->
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style type="text/css">
p{margin:10px 0;padding:0;}table{border-collapse:collapse;}h1,h2,h3,h4,h5,h6{display:block;margin:0;padding:0;}img,a img{border:0;height:auto;outline:none;text-decoration:none;}body,#bodyTable,#bodyCell{height:100%;margin:0;padding:0;width:100%;}.mcnPreviewText{display:none!important;}#outlook a{padding:0;}img{-ms-interpolation-mode:bicubic;}table{mso-table-lspace:0pt;mso-table-rspace:0pt;}.ReadMsgBody{width:100%;}.ExternalClass{width:100%;}p,a,li,td,blockquote{
mso-line-height-rule:exactly;}a[href^=tel],a[href^=sms]{color:inherit;cursor:default;text-decoration:none;}p,a,li,td,body,table,blockquote{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;}.ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{line-height:100%;}a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;
line-height:inherit!important;}table[align=left]{float:left;}table[align=right]{float:right;}.templateContainer{max-width:600px!important;}a.mcnButton{display:block;}.mcnImage,.mcnRetinaImage{vertical-align:bottom;}.mcnTextContent{word-break:break-word;}.mcnTextContent img{height:auto!important;}.mcnDividerBlock{table-layout:fixed!important;}h1{color:#5ed8a9;font-family:'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:40px;font-style:normal;font-weight:bold;line-height:150%;
letter-spacing:normal;text-align:center;}h2{color:#5ed8a9;font-family:'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:34px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:left;}h3{color:#5ed8a9;font-family:'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:22px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:left;}h4{color:#5ed8a9;font-family:'Lato','Helvetica Neue',Helvetica,Arial,sans-serif;
font-size:20px;font-style:normal;font-weight:bold;line-height:125%;letter-spacing:normal;text-align:left;}#templateHeader{background-color:#e7efff;background-image:none;background-repeat:no-repeat;background-position:50% 50%;background-size:cover;border-top:0;border-bottom:0;padding-top:15px;padding-bottom:15px;}.headerContainer{background-color:#transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;
padding-top:0;padding-bottom:0;}.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{color:#5ed8a9;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left;}.headerContainer .mcnTextContent a,.headerContainer .mcnTextContent p a{color:#007C89;font-weight:normal;text-decoration:underline;}#templateBody{background-color:#e7efff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0px;
padding-bottom:0px;}.bodyContainer{background-color:#transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0;}.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{color:#ffffff;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left;}.bodyContainer .mcnTextContent a,.bodyContainer .mcnTextContent p a{color:#1789dc;font-weight:normal;
text-decoration:underline;}#templateFooter{background-color:#333333;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:15px;padding-bottom:15px;}.footerContainer{background-color:#transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0;}.footerContainer .mcnTextContent,.footerContainer
.mcnTextContent p{color:#FFFFFF;font-family:Helvetica;font-size:12px;line-height:150%;text-align:center;}.footerContainer .mcnTextContent a,.footerContainer .mcnTextContent p a{color:#FFFFFF;font-weight:normal;text-decoration:underline;}
@media only screen and (min-width:768px){.templateContainer{width:600px!important;} }
@media only screen and (max-width:480px){body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:none!important;} }
@media only screen and (max-width:480px){body{width:100%!important;min-width:100%!important;} }
@media only screen and (max-width:480px){.mcnRetinaImage{max-width:100%!important;} }
@media only screen and (max-width:480px){.mcnImage{width:100%!important;} }
@media only screen and (max-width:480px){
.mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer,.mcnImageCardLeftImageContentContainer,.mcnImageCardRightImageContentContainer{max-width:100%
!important;width:100%!important;} }
@media only screen and (max-width:480px){.mcnBoxedTextContentContainer{min-width:100%!important;} }
@media only screen and (max-width:480px){.mcnImageGroupContent{padding:9px!important;} }
@media only screen and (max-width:480px){.mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{padding-top:9px!important;} }
@media only screen and (max-width:480px){.mcnImageCardTopImageContent,.mcnCaptionBottomContent:last-child .mcnCaptionBottomImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{padding-top:18px!important;} }
@media only screen and (max-width:480px){.mcnImageCardBottomImageContent{padding-bottom:9px!important;} }
@media only screen and (max-width:480px){.mcnImageGroupBlockInner{padding-top:0!important;padding-bottom:0!important;} }
@media only screen and (max-width:480px){.mcnImageGroupBlockOuter{padding-top:9px!important;padding-bottom:9px!important;} }
@media only screen and (max-width:480px){.mcnTextContent,.mcnBoxedTextContentColumn{padding-right:18px!important;padding-left:18px!important;} }
@media only screen and (max-width:480px){.mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{padding-right:18px!important;padding-bottom:0!important;padding-left:18px!important;} }
@media only screen and (max-width:480px){.mcpreview-image-uploader{display:none!important;width:100%!important;} }
@media only screen and (max-width:480px){h1{font-size:30px!important;line-height:125%!important;} }
@media only screen and (max-width:480px){h2{font-size:26px!important;line-height:125%!important;} }
@media only screen and (max-width:480px){h3{font-size:20px!important;line-height:150%!important;} }
@media only screen and (max-width:480px){h4{font-size:18px!important;line-height:150%!important;} }
@media only screen and (max-width:480px){.mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{font-size:14px!important;line-height:150%!important;} }
@media only screen and (max-width:480px){.headerContainer .mcnTextContent,.headerContainer .mcnTextContent p{font-size:16px!important;line-height:150%!important;} }
@media only screen and (max-width:480px){.bodyContainer .mcnTextContent,.bodyContainer .mcnTextContent p{font-size:16px!important;line-height:150%!important;} }
@media only screen and (max-width:480px){.footerContainer .mcnTextContent,.footerContainer .mcnTextContent p{font-size:14px!important;line-height:150%!important;} }
</style>
</head>
<body><center>
<table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"><tr><td align="center" valign="top" id="bodyCell"><!-- BEGIN TEMPLATE // -->
<table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top" id="templateHeader" data-template-container>
<!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;"><tr><td align="center" valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer"><tr><td valign="top" class="headerContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock"><tbody class="mcnCaptionBlockOuter"><tr><td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightContentOuter" width="100%"><tbody><tr><td valign="top" class="mcnCaptionRightContentInner" style="padding:0 9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionRightImageContentContainer" width="132"><tbody><tr><td class="mcnCaptionRightImageContent" align="center" valign="top"> <img alt="" src="https://mcusercontent.com/36d73585139760aa245837bb2/images/414fa53d-de89-4184-9477-faefac39d22e.png" width="132" style="max-width:6000px;border:1px none;border-radius:0%;" class="mcnImage">
</td></tr></tbody></table>
<table class="mcnCaptionRightTextContentContainer" align="right" border="0" cellpadding="0" cellspacing="0" width="396"><tbody><tr><td valign="top" class="mcnTextContent" style="text-align:left;"> <br> <br> <span style="font-size:44px"><strong><span style="color:#2c41db"><span style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp; </span></span></strong></span><span style="font-size:43px"><strong><span style="color:#2c41db"><span style="font-family:lato,helvetica
neue,helvetica,arial,sans-serif">TAMU DATATHON</span></span></strong></span>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></table>
<!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
</td></tr><tr><td align="center" valign="top" id="templateBody" data-template-container>
<!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;"><tr><td align="center" valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer"><tr><td valign="top" class="bodyContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
<!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
<!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding:0px 18px 9px;color:#5ED8A9;"><div style="text-align:center;"><span style="font-size:35px"><strong><span style="color:#2c41db"><span style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">Howdy!</span></span></strong></span></div>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]></tr></table>
<![endif]-->
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
<!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
<!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding:0px 18px 9px;color:#FFFFFF;text-align:left;"> <span style="font-size:17px"><span style="font-family:lato,helvetica neue,helvetica,arial,sans-serif"><span style="color:#555555">Thank you for your application to the TAMU Datathon Lite 2025 and the effort you put into it. While we were
impressed by your submission, we regret to inform you that we are unable to offer an acceptance for this round.</span></span></span>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]></tr></table>
<![endif]-->
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
<!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
<!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding:0px 18px 9px;color:#FFFFFF;text-align:center;">
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]></tr></table>
<![endif]-->
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnButtonBlock" style="min-width:100%;"><tbody class="mcnButtonBlockOuter"><tr><td style="padding-top:0;padding-right:18px;padding-bottom:18px;padding-left:18px;" valign="top" align="center" class="mcnButtonBlockInner">
<table border="0" cellpadding="0" cellspacing="0" class="mcnButtonContentContainer" style="border-collapse:separate!important;border-radius:11px;background-color:#627EFD;"><tbody><tr><td align="center" valign="middle" class="mcnButtonContent" style="font-family:Lato,&quot;Helvetica Neue&quot;,Helvetica,Arial,sans-serif;font-size:18px;padding:18px;"> <a class="mcnButton " title="TD Website" href="https://tamudatathon.com" target="_blank" style="font-weight:bold;letter-spacing:-0.5px;line-height:
100%;text-align:center;text-decoration:none;color:#FFFFFF;">TD Website</a>
</td></tr></tbody></table>
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="min-width:100%;padding:18px;">
<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;"><tbody><tr><td> <span></span>
</td></tr></tbody></table><!-- <td class="mcnDividerBlockInner" style="padding:18px;"><hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;"/> -->
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="min-width:100%;padding:18px;">
<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-top:2px solid #6C6CE2;"><tbody><tr><td> <span></span>
</td></tr></tbody></table><!-- <td class="mcnDividerBlockInner" style="padding:18px;"><hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;"/> -->
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnCaptionBlock"><tbody class="mcnCaptionBlockOuter"><tr><td class="mcnCaptionBlockInner" valign="top" style="padding:9px;">
<table border="0" cellpadding="0" cellspacing="0" class="mcnCaptionLeftContentOuter" width="100%"><tbody><tr><td valign="top" class="mcnCaptionLeftContentInner" style="padding:0 9px;">
<table align="right" border="0" cellpadding="0" cellspacing="0" class="mcnCaptionLeftImageContentContainer" width="176"><tbody><tr><td class="mcnCaptionLeftImageContent" align="center" valign="top"> <img alt="" src="https://mcusercontent.com/36d73585139760aa245837bb2/images/386e8ab8-96d9-7b1f-c2fe-e999573fcbb6.png" width="176" style="max-width:5959px;" class="mcnImage">
</td></tr></tbody></table>
<table class="mcnCaptionLeftTextContentContainer" align="left" border="0" cellpadding="0" cellspacing="0" width="352"><tbody><tr><td valign="top" class="mcnTextContent" style="color:#FFFFFF;font-size:24px;text-align:left;"><p style="font-size:24px;color:#FFFFFF;text-align:left;"><span style="color:#627efd"><span style="font-size:22px"><strong><span style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Thanks and
Gig'em,</span></strong></span></span><br> <strong><span style="color:#2c41db"><span style="font-size:24px"><span style="font-family:lato,helvetica neue,helvetica,arial,sans-serif">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; TAMU Datathon</span></span></span></strong></p>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></table>
<!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
</td></tr><tr><td align="center" valign="top" id="templateFooter" data-template-container>
<!--[if (gte mso 9)|(IE)]>
<table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;"><tr><td align="center" valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer"><tr><td valign="top" class="footerContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowBlock" style="min-width:100%;"><tbody class="mcnFollowBlockOuter"><tr><td align="center" valign="top" style="padding:9px" class="mcnFollowBlockInner">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentContainer" style="min-width:100%;"><tbody><tr><td align="center" style="padding-left:9px;padding-right:9px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;" class="mcnFollowContent"><tbody><tr><td align="center" valign="top" style="padding-top:9px;padding-right:9px;padding-left:9px;">
<table align="center" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td align="center" valign="top">
<!--[if mso]>
<table align="center" border="0" cellspacing="0" cellpadding="0"><tr>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:10px;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://github.com/tamu-datathon-org" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-github-48.png" alt="GitHub" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:10px;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://tamudatathon.com/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-link-48.png" alt="Website" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:10px;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://www.instagram.com/tamudatathon/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-instagram-48.png" alt="Link" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:10px;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://www.facebook.com/tamudatathon/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-facebook-48.png" alt="Facebook" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:10px;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://twitter.com/tamudatathon/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-twitter-48.png" alt="Twitter" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:10px;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://medium.com/@tamudatathon" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-medium-48.png" alt="Medium" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]><td align="center" valign="top">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" class="mcnBlockFloatLeft" style="display:inline;"><tbody><tr><td valign="top" style="padding-right:0;padding-bottom:9px;" class="mcnFollowContentItemContainer">
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnFollowContentItem"><tbody><tr><td align="left" valign="middle" style="padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:9px;">
<table align="left" border="0" cellpadding="0" cellspacing="0" width=""><tbody><tr><td align="center" valign="middle" width="24" class="mcnFollowIconContent"> <a href="https://www.linkedin.com/company/tamudatathon/" target="_blank"><img src="https://cdn-images.mailchimp.com/icons/social-block-v2/outline-light-linkedin-48.png" alt="LinkedIn" style="display:block;" height="24" width="24" class=""></a>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]></tr></table>
<![endif]-->
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnDividerBlock" style="min-width:100%;"><tbody class="mcnDividerBlockOuter"><tr><td class="mcnDividerBlockInner" style="min-width:100%;padding:18px;">
<table class="mcnDividerContent" border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-top:2px solid #505050;"><tbody><tr><td> <span></span>
</td></tr></tbody></table><!-- <td class="mcnDividerBlockInner" style="padding:18px;"><hr class="mcnDividerContent" style="border-bottom-color:none;border-left-color:none;border-right-color:none;border-bottom-width:0;border-left-width:0;border-right-width:0;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;"/> -->
</td></tr></tbody></table>
<table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width:100%;"><tbody class="mcnTextBlockOuter"><tr><td valign="top" class="mcnTextBlockInner" style="padding-top:9px;">
<!--[if mso]>
<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;"><tr>
<![endif]-->
<!--[if mso]><td valign="top" width="600" style="width:600px;">
<![endif]-->
<table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width:100%;min-width:100%;" width="100%" class="mcnTextContentContainer"><tbody><tr><td valign="top" class="mcnTextContent" style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;"> <em>Copyright © 2025 TAMU Datathon All rights reserved.</em>
</td></tr></tbody></table>
<!--[if mso]>
</td>
<![endif]-->
<!--[if mso]></tr></table>
<![endif]-->
</td></tr></tbody></table>
</td></tr></table>
<!--[if (gte mso 9)|(IE)]>
</td></tr></table>
<![endif]-->
</td></tr></table><!-- // END TEMPLATE -->
</td></tr></table></center>
<script type="text/javascript"  src="/PhGe4s/_b/yr/D-n0/DqUZP7gD5k/DEh9kkVwmDmpD3b5/KSsCAQ/T34J/R1BJKCwB"></script>
</body>
</html>
`;

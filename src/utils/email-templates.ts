import { IPostDocument } from '../database/posts/posts.types';

export function receiptEmail(date: string, amount: string): string {
    const html = `<html lang="en">
        <head>
            <meta charset="utf-8">
            <style>
            /*============== fonts ==========*/
            /* cyrillic-ext */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr4fJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
            }
            /* cyrillic */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrcfJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            /* greek */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrAfJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0370-03FF;
            }
            /* vietnamese */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrwfJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
            }
            /* latin-ext */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr0fJh1Zyc61YBlG.woff) format('woff');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
                font-family: 'Comfortaa';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrMfJh1Zyc61YA.woff) format('woff');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* latin-ext */
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* latin-ext */
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
                font-family: 'Lato';
                font-style: normal;
                font-weight: 700;
                font-display: swap;
                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* cyrillic-ext */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');
                unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
            }
            /* cyrillic */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2) format('woff2');
                unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
            }
            /* greek-ext */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2) format('woff2');
                unicode-range: U+1F00-1FFF;
            }
            /* greek */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2) format('woff2');
                unicode-range: U+0370-03FF;
            }
            /* vietnamese */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2) format('woff2');
                unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
            }
            /* latin-ext */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2) format('woff2');
                unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
                font-family: 'Open Sans';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }

            body {
                font-family: 'Lato', sans-serif;
                position: relative;
                margin: 0px;
                color: #00170f;
                background-color: #fbfcff;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                font-family: 'Open Sans', sans-serif;
                font-weight: normal;
                margin: 0;
            }

            p {
                margin: 0;
            }
            a {
                color: inherit;
            }
            
            .flex {
                display:-webkit-flex;
                display:-ms-flexbox;
                display:flex;
            }
            .container {
                max-width: 540px;
                margin: 0 auto;
            }
            .logo {
                font-family: 'Comfortaa', sans-serif;
                font-weight: normal;
                font-size: calc(16px * 1.33957);
            }
            .header {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                margin-top: 32px;
                padding-left: 16px;
                padding-right: 16px;
            }
            .date > p {
                color: #535353;
                font-size: calc(16px * .85);
            }
            .copyright {
                background-color: #040404;
                color: #fbfcff;
                justify-content: space-between;
                align-items: center;
                padding-left: 24px;
                padding-right: 24px;
                padding-top: 24px;
                padding-bottom: 24px;
                margin-top: 32px;
                flex-wrap: wrap;
            }
            .copyright > a {
                font-size: calc(16px * .85);
            }
            .content {
                height: 450px;
                margin-top: 32px;
            }
            .title > h4 {
                font-size: calc(16px * 2.31481);
            }
            .receipt {
                margin-top: 64px;
            }
            .receipt-items {
                margin-top: 24px;
                align-items: center;
            }
            .receipt-items .label {
                width: 75%;
            }
            .receipt-items .amount {
                width: 25%;
                font-weight: bold;
            }
            </style>

        </head>

        <body>
            <div class="container">
            <div class="header flex">
                <h4 class="logo">
                H &#183; H &#183; C
                </h4>
                <div class="date">
                <p>
                    ${date}
                </p>
                </div>
            </div>
            <div class="content">
                <div class="title">
                <h4>
                    Thank you for buying us coffee.
                </h4>
                </div>
                <div class="receipt">
                <div class="receipt-header">
                    <p>
                    Items:
                    </p>
                </div>
                <div class="receipt-items flex">
                    <div class="label">
                    <p>
                        Coffee Cups
                    </p>
                    </div>
                    <div class="amount">
                    <p>
                        ${amount}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="copyright flex pl-6 pr-6">
            <p class="text font-sm"> © 2020 Hip Hop and Code. All rights reserved </p>
            </div>
        </body>
        </html>
    `;
    return html;
}

export function subscribeEmail(
    title: string,
    linkText: string,
    linkUrl: string,
    date: string,
    showSubscribeLink: boolean,
): string {
    return genericTemplate(title, linkText, linkUrl, date, showSubscribeLink, true);
}

export function genericUserAccountEmail(
    title: string,
    linkText: string,
    linkUrl: string,
    date: string,
    showSubscribeLink: boolean,
    showActionLink: boolean,
): string {
    return genericTemplate(title, linkText, linkUrl, date, showSubscribeLink, showActionLink);
}

export function newPostEmail(date: string, showSubscribeLink: boolean, post?: IPostDocument): string | null {
    return !!post
        ? `<html lang="en">
  <head>
    <meta charset="utf-8">
    <style>
      /*============== fonts ==========*/
      /* cyrillic-ext */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr4fJh1Zyc61YBlG.woff) format('woff');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrcfJh1Zyc61YBlG.woff) format('woff');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrAfJh1Zyc61YBlG.woff) format('woff');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrwfJh1Zyc61YBlG.woff) format('woff');
        unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr0fJh1Zyc61YBlG.woff) format('woff');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Comfortaa';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrMfJh1Zyc61YA.woff) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* cyrillic-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');
        unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
      }
      /* cyrillic */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2) format('woff2');
        unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
      }
      /* greek-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2) format('woff2');
        unicode-range: U+1F00-1FFF;
      }
      /* greek */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2) format('woff2');
        unicode-range: U+0370-03FF;
      }
      /* vietnamese */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2) format('woff2');
        unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
      }
      /* latin-ext */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2) format('woff2');
        unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
      }
      /* latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }

      body {
        font-family: 'Lato', sans-serif;
        position: relative;
        margin: 0px;
        color: #00170f;
        background-color: #fbfcff;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Open Sans', sans-serif;
        font-weight: normal;
        margin: 0;
      }

      p {
        margin: 0;
      }
      a {
        color: inherit;
      }
      
      .flex {
        display:-webkit-flex;
        display:-ms-flexbox;
        display:flex;
      }
      .container {
        max-width: 540px;
        margin: 0 auto;
      }
      .logo {
        font-family: 'Comfortaa', sans-serif;
        font-weight: normal;
        font-size: calc(16px * 1.33957);
      }
      .header {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 32px;
        padding-left: 16px;
        padding-right: 16px;
      }
      .date > p {
        color: #535353;
        font-size: calc(16px * .85);
      }
      .post-title {
        margin-top: 32px;
        margin-bottom: 8px;
        padding-left: 16px;
        padding-right: 16px;
      }
      .post-title > h4 {
        font-size: calc(16px * 2.31481);
      }
      .post-sub-title {
        margin-bottom: 16px;
        padding-left: 16px;
        padding-right: 16px;
      }
      .post-sub-title > h6 {
        font-size: calc(16px * 1.33957);
      }
      .post-header-img > img {
        width: 100%;
        max-height: 400px;
      }
      .post-link {
        margin-top: 32px;
        width: 100%;
        justify-content: center;
      }
      .post-link > a {
        justify-content: center;
        align-items: center;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        color: #fff;
    	background-color: #ff001d;
    	border-color: #ff001d);
        text-decoration: none;
        padding: 8px 16px;
        font-size: 20px;
        line-height: 1.5;
        width: 50%;
      }
      .copyright {
        background-color: #040404;
        color: #fbfcff;
        justify-content: space-between;
        align-items: center;
        padding-left: 24px;
        padding-right: 24px;
        padding-top: 24px;
        padding-bottom: 24px;
        margin-top: 32px;
        flex-wrap: wrap;
      }
      .copyright > a {
        font-size: calc(16px * .85);
      }
    </style>

  </head>

  <body>
    <div class="container">
      <div class="header flex">
        <h4 class="logo">
          H &#183; H &#183; C
        </h4>
        <div class="date">
          <p>
            ${date}
          </p>
        </div>
      </div>
      <div class="post-title">
        <h4>
          ${post.title}
        </h4>
      </div>
      <div class="post-sub-title">
        <h6>
          ${post.meta.subtitle}
        </h6>
      </div>
      <div class="post-header-img">
        <img src="${post.headerImg}" alt="header image"/>
      </div>
      <div class="post-link flex">
        <a href="https://www.hhncode.com/detail?title=${post.title}&_id=${post._id}">
        	View Post
        </a>
      </div>
    </div>
    <div class="copyright flex pl-6 pr-6">
      <p class="text font-sm"> © 2020 Hip Hop and Code. All rights reserved </p>
      ${showSubscribeLink ? `<a class="unsubscribe" href="https://www.hhncode.com/unsubscribe">Unsubscribe</a>` : ''}
    </div>
  </body>
</html>`
        : null;
}

function genericTemplate(
    title: string,
    linkText: string,
    linkUrl: string,
    date: string,
    showSubscribeLink: boolean,
    showActionLink: boolean,
): string {
    const html = `<html lang="en">
    <head>
        <meta charset="utf-8">
        <style>
        /*============== fonts ==========*/
        /* cyrillic-ext */
        @font-face {
            font-family: 'Comfortaa';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr4fJh1Zyc61YBlG.woff) format('woff');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
            font-family: 'Comfortaa';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrcfJh1Zyc61YBlG.woff) format('woff');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek */
        @font-face {
            font-family: 'Comfortaa';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrAfJh1Zyc61YBlG.woff) format('woff');
            unicode-range: U+0370-03FF;
        }
        /* vietnamese */
        @font-face {
            font-family: 'Comfortaa';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrwfJh1Zyc61YBlG.woff) format('woff');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
            font-family: 'Comfortaa';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDr0fJh1Zyc61YBlG.woff) format('woff');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: 'Comfortaa';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(https://fonts.gstatic.com/s/comfortaa/v29/1Pt_g8LJRfWJmhDAuUsSQamb1W0lwk4S4Y_LDrMfJh1Zyc61YA.woff) format('woff');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* latin-ext */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        /* cyrillic-ext */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWJ0bf8pkAp6a.woff2) format('woff2');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }
        /* cyrillic */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFUZ0bf8pkAp6a.woff2) format('woff2');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }
        /* greek-ext */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWZ0bf8pkAp6a.woff2) format('woff2');
            unicode-range: U+1F00-1FFF;
        }
        /* greek */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVp0bf8pkAp6a.woff2) format('woff2');
            unicode-range: U+0370-03FF;
        }
        /* vietnamese */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFWp0bf8pkAp6a.woff2) format('woff2');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }
        /* latin-ext */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFW50bf8pkAp6a.woff2) format('woff2');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }
        /* latin */
        @font-face {
            font-family: 'Open Sans';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: local('Open Sans Regular'), local('OpenSans-Regular'), url(https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0bf8pkAg.woff2) format('woff2');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        body {
            font-family: 'Lato', sans-serif;
            position: relative;
            margin: 0px;
            color: #00170f;
            background-color: #fbfcff;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
            font-family: 'Open Sans', sans-serif;
            font-weight: normal;
            margin: 0;
        }

        p {
            margin: 0;
        }
        a {
            color: inherit;
        }
        
        .flex {
            display:-webkit-flex;
            display:-ms-flexbox;
            display:flex;
        }
        .container {
            max-width: 540px;
            margin: 0 auto;
        }
        .logo {
            font-family: 'Comfortaa', sans-serif;
            font-weight: normal;
            font-size: calc(16px * 1.33957);
        }
        .header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-top: 32px;
            padding-left: 16px;
            padding-right: 16px;
        }
        .date > p {
            color: #535353;
            font-size: calc(16px * .85);
        }
        .link {
            margin-top: 48px;
            width: 100%;
            justify-content: center;
        }
        .link > a {
            justify-content: center;
            align-items: center;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            border: 1px solid transparent;
            color: #fff;
            background-color: #ff001d;
            border-color: #ff001d);
            text-decoration: none;
            padding: 8px 16px;
            font-size: 20px;
            line-height: 1.5;
            width: 50%;
        }
        .copyright {
            background-color: #040404;
            color: #fbfcff;
            justify-content: space-between;
            align-items: center;
            padding-left: 24px;
            padding-right: 24px;
            padding-top: 24px;
            padding-bottom: 24px;
            margin-top: 32px;
            flex-wrap: wrap;
        }
        .copyright > a {
            font-size: calc(16px * .85);
        }
        .content {
            height: 400px;
            margin-top: 32px;
        }
        .title > h4 {
            font-size: calc(16px * 2.31481);
        }
        </style>

    </head>

    <body>
        <div class="container">
        <div class="header flex">
            <h4 class="logo">
            H &#183; H &#183; C
            </h4>
            <div class="date">
            <p>
                ${date}
            </p>
            </div>
        </div>
        <div class="content">
            <div class="title">
            <h4>
                ${title}
            </h4>
            </div>
            ${
                showActionLink
                    ? `<div class="link flex">
            <a href="${linkUrl}">
                ${linkText}
            </a>
            </div>`
                    : ''
            }
        </div>
        </div>
        <div class="copyright flex pl-6 pr-6">
        <p class="text font-sm"> © 2020 Hip Hop and Code. All rights reserved </p>
        ${showSubscribeLink ? `<a class="unsubscribe" href="https://www.hhncode.com/unsubscribe">Unsubscribe</a>` : ''}
        </div>
    </body>
    </html>
    `;
    return html;
}

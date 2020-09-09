import { IPostDocument } from '../database/posts/posts.types';
import { newPostEmail, genericUserAccountEmail, subscribeEmail, receiptEmail } from '../utils/email-templates';
import dayjs from 'dayjs';
import nodemailer from 'nodemailer';
import { IReceiptDocument } from '../database/receipts/receipts.types';
import environment from '../utils/environment';

export enum EmailType {
    NewPost,
    UserRegistration,
    UserSubscription,
    UserAccountDeletion,
    UserUnsubscribe,
    UserAccountChange,
    CommentReport,
    UserDontationReceipt,
}

export interface IEmail {
    to: string;
    subject: string;
    post?: IPostDocument;
    receipt?: IReceiptDocument;
    type: EmailType;
}

interface IEmailService {
    sendEmail: (email: IEmail) => Promise<boolean>;
}

const DAY_JS_FORMAT = 'dddd, MMMM DD, YYYY';

export default class EmailService implements IEmailService {
    async sendEmail(email: IEmail): Promise<boolean> {
        switch (email.type) {
            case EmailType.NewPost:
                return await this._sendNewPostEmail(email);
            case EmailType.UserRegistration:
                return await this._sendUserRegistrationEmail(email);
            case EmailType.UserSubscription:
                return await this._sendUserSubscriptionEmail(email);
            case EmailType.UserAccountDeletion:
                return await this._sendUserAccountDeletionEmail(email);
            case EmailType.UserAccountChange:
                return await this._sendUserAccountChangeEmail(email);
            case EmailType.UserUnsubscribe:
                return await this._sendUserUnsubscribeEmail(email);
            case EmailType.CommentReport:
                return await this._sendCommentReportEmail(email);
            case EmailType.UserDontationReceipt:
                return await this._sendUserDonationReceiptEmail(email);
            default:
                console.log('IEmail type not defined');
        }
        return false;
    }
    private async _sendEmail(html: string, email: IEmail): Promise<boolean> {
        /**
         * TODO
         * Modify the port and email stuff based on what GoDaddy says
         */
        // const mailerConfig = {
        //     host: 'smtp.office365.com',
        //     secureConnection: true,
        //     port: 587,
        //     auth: {
        //         user: environment.FROM_EMAIL,
        //         pass: 'password',
        //     },
        // };
        const mailerConfig = {
            service: 'gmail',
            auth: {
                user: 'woodawilliam@gmail.com',
                pass: 'zxqufdzfmyslownd',
            },
        };
        const transporter = nodemailer.createTransport(mailerConfig);

        const mailOptions = {
            from: `Alex at HHnCode <${mailerConfig.auth.user}>`,
            to: email.to,
            subject: email.subject,
            html,
        };

        const result = await transporter.sendMail(mailOptions);
        return result.accepted.length > 0;
    }

    private async _sendNewPostEmail(email: IEmail): Promise<boolean> {
        const html = newPostEmail('', true, email.post);
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendUserRegistrationEmail(email: IEmail): Promise<boolean> {
        const title = 'Thank you for registering with Hip Hop n Code.';
        const linkText = 'View your account';
        const linkUrl = 'https://www.hhncode.com/account-settings';
        const showActionLink = true;
        const showUnsubscribeLink = false;

        const html = genericUserAccountEmail(
            title,
            linkText,
            linkUrl,
            dayjs().format(DAY_JS_FORMAT),
            showUnsubscribeLink,
            showActionLink,
        );
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendUserSubscriptionEmail(email: IEmail): Promise<boolean> {
        const title = 'Thank you for subscribing with Hip Hop n Code.';
        const linkText = 'Go to site';
        const linkUrl = 'https://www.hhncode.com/home';
        const showUnsubscribeLink = false;

        const html = subscribeEmail(title, linkText, linkUrl, dayjs().format(DAY_JS_FORMAT), showUnsubscribeLink);
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendUserAccountDeletionEmail(email: IEmail): Promise<boolean> {
        const title = 'Thank you for spending time with Hip Hop n Code.';
        const showActionLink = false;
        const showUnsubscribeLink = false;

        const html = genericUserAccountEmail(
            title,
            '',
            '',
            dayjs().format(DAY_JS_FORMAT),
            showUnsubscribeLink,
            showActionLink,
        );
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendUserAccountChangeEmail(email: IEmail): Promise<boolean> {
        const title = 'Your account settings were changed.';
        const linkText = 'View your account';
        const linkUrl = 'https://www.hhncode.com/account-settings';
        const showActionLink = true;
        const showUnsubscribeLink = false;

        const html = genericUserAccountEmail(
            title,
            linkText,
            linkUrl,
            dayjs().format(DAY_JS_FORMAT),
            showUnsubscribeLink,
            showActionLink,
        );
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendUserUnsubscribeEmail(email: IEmail): Promise<boolean> {
        const title = 'Thank you for spending time with Hip Hop n Code.';
        const showActionLink = false;
        const showUnsubscribeLink = false;

        const html = genericUserAccountEmail(
            title,
            '',
            '',
            dayjs().format(DAY_JS_FORMAT),
            showUnsubscribeLink,
            showActionLink,
        );
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendCommentReportEmail(email: IEmail): Promise<boolean> {
        const title = 'Your report has been received.';
        const linkText = 'Go to site';
        const linkUrl = 'https://www.hhncode.com/home';
        const showActionLink = true;
        const showUnsubscribeLink = false;

        const html = genericUserAccountEmail(
            title,
            linkText,
            linkUrl,
            dayjs().format(DAY_JS_FORMAT),
            showUnsubscribeLink,
            showActionLink,
        );
        if (html) {
            // use node mailer to send email
            return this._sendEmail(html, email);
        }
        return false;
    }

    private async _sendUserDonationReceiptEmail(email: IEmail): Promise<boolean> {
        const receipt = !!email.receipt ? email.receipt : null;
        if (receipt) {
            const amount = receipt.amount / 100;
            const html = receiptEmail(dayjs().format(DAY_JS_FORMAT), `$${amount}.00`);
            return this._sendEmail(html, email);
        }
        return false;
    }
}
